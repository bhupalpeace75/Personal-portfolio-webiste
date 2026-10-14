import { validateInquiry } from "./validation.mjs";
const json = (body, status = 200) => Response.json(body, { status });

// Preflight validation only. The browser sends the actual inquiry to FormSubmit.
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
  return json({ validated: true });
}
