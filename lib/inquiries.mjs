import { validateInquiry } from "./validation.mjs";
import { createHash } from "node:crypto";
const json = (body, status = 200) => Response.json(body, { status });
// Best-effort controls per server instance. No inquiry text is kept in these maps.
const receipts = new Map();
const attempts = new Map();
const digest = (value) => createHash("sha256").update(value).digest("hex");
function prune(map, now) {
  for (const [key, item] of map) if (item.expires < now) map.delete(key);
  while (map.size > 2000) map.delete(map.keys().next().value);
}

export async function handleInquiry(request, env, fetcher = fetch) {
  const url = new URL(request.url);
  let origin;
  try {
    origin = env.NEXT_PUBLIC_SITE_URL
      ? new URL(env.NEXT_PUBLIC_SITE_URL).origin
      : url.protocol + "//" + (request.headers.get("host") || url.host);
  } catch {
    return json(
      {
        error:
          "The website address is misconfigured. Please contact me by email.",
      },
      503,
    );
  }
  if (request.headers.get("origin") !== origin)
    return json({ error: "Please submit from this website." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return json({ error: "Unsupported request format." }, 415);
  const raw = await request.text();
  if (raw.length > 20000)
    return json({ error: "Your inquiry is too long." }, 413);
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  const { errors, clean } = validateInquiry(data);
  if (Object.keys(errors).length)
    return json({ error: "Please check the highlighted fields.", errors }, 422);
  if (
    typeof data?._honey !== "string" ||
    data._honey ||
    typeof data.startedAt !== "number" ||
    Date.now() - data.startedAt < 2500 ||
    Date.now() - data.startedAt > 86400000
  )
    return json(
      {
        error:
          "Please wait a moment, then try again. Your inquiry has not been sent.",
      },
      400,
    );
  if (typeof data.requestId !== "string" || !/^[a-zA-Z0-9-]{16,80}$/.test(data.requestId))
    return json({ error: "Please refresh the page and try again." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.INQUIRY_TO || ""))
    return json({ error: "Email delivery is not configured. Please contact me by email." }, 503);

  const now = Date.now();
  prune(receipts, now);
  prune(attempts, now);
  const key = digest(origin + data.requestId + JSON.stringify(clean));
  const previous = receipts.get(key);
  if (previous) {
    const result = await previous.result;
    return json(result.body, result.status);
  }
  // Vercel supplies the originating address; outside Vercel this is best effort.
  const address = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "unknown";
  const bucketKey = digest(origin + address);
  const bucket = attempts.get(bucketKey) || { count: 0, expires: now + 600000 };
  if (bucket.count >= 5)
    return json({ error: "Too many attempts. Please wait 10 minutes or contact me by email." }, 429);
  bucket.count++;
  attempts.set(bucketKey, bucket);

  const result = (async () => {
    try {
      const response = await fetcher(`https://formsubmit.co/ajax/${encodeURIComponent(env.INQUIRY_TO)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json", Origin: origin, Referer: origin + "/contact" },
        body: JSON.stringify({ ...clean, _subject: "New consultation inquiry — Digital Bhupendra", _template: "table", _honey: "" }),
        signal: AbortSignal.timeout(18000),
        redirect: "error",
      });
      const body = await response.json();
      if (!response.ok || (body.success !== true && body.success !== "true"))
        return { status: 502, body: { error: "FormSubmit could not accept your inquiry. Your details are still here. Please try again later or contact me by email." } };
      return { status: 200, body: { accepted: true } };
    } catch {
      return { status: 502, body: { error: "We could not confirm submission. Your details are still here. Please try again later or contact me by email." } };
    }
  })();
  receipts.set(key, { result, expires: now + 600000 });
  const outcome = await result;
  // Keep uncertain network outcomes briefly to prevent immediate duplicate sends.
  if (outcome.status !== 200 && receipts.has(key)) receipts.get(key).expires = Date.now() + 30000;
  return json(outcome.body, outcome.status);
}
