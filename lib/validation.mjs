export function validateInquiry(data) {
  const errors = {};
  const clean = {};
  for (const [key, max] of [
    ["name", 120],
    ["email", 254],
    ["business", 160],
    ["website", 500],
    ["phone", 40],
    ["goal", 2000],
    ["message", 5000],
  ]) {
    clean[key] = typeof data?.[key] === "string" ? data[key].trim() : "";
    if (clean[key].length > max)
      errors[key] = `Please use ${max} characters or fewer.`;
  }
  for (const key of ["name", "email", "business", "goal", "message"])
    if (!clean[key]) errors[key] = "This field is required.";
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))
    errors.email = "Enter a valid email address.";
  if (clean.website) {
    try {
      const u = new URL(clean.website);
      if (
        !["http:", "https:"].includes(u.protocol) ||
        !u.hostname.includes(".")
      )
        throw Error();
    } catch {
      errors.website = "Enter a full website URL, such as https://example.com.";
    }
  }
  return { clean, errors };
}
