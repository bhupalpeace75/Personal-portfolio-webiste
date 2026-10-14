import { validateInquiry } from "./validation.mjs";
import { createHash } from "node:crypto";
const json = (body, status = 200) => Response.json(body, { status });
// Best-effort controls per server instance. No inquiry text is kept in these maps.
const attempts = new Map();
const digest = (value) => createHash("sha256").update(value).digest("hex");
function prune(map, now) {
  for (const [key, item] of map) if (item.expires < now) map.delete(key);
  while (map.size > 2000) map.delete(map.keys().next().value);
}

export async function handleInquiry(request, env) {
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
  const { errors } = validateInquiry(data);
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
  prune(attempts, now);
  // Vercel supplies the originating address; outside Vercel this is best effort.
  const address = request.headers.get("x-vercel-forwarded-for") || request.headers.get("x-forwarded-for") || "unknown";
  const bucketKey = digest(origin + address);
  const bucket = attempts.get(bucketKey) || { count: 0, expires: now + 600000 };
  if (bucket.count >= 5)
    return json({ error: "Too many attempts. Please wait 10 minutes or contact me by email." }, 429);
  bucket.count++;
  attempts.set(bucketKey, bucket);

  // Validation is not delivery. The browser submits via the provider's AJAX API.
  return json({ validated: true });
}
