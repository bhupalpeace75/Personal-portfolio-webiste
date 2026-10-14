// Runs in the visitor's browser, as documented by FormSubmit's AJAX integration.
export async function sendInquiry(clean, recipient, fetcher = fetch) {
  const response = await fetcher(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...clean, _subject: "New consultation inquiry — Digital Bhupendra", _template: "table", _honey: "" }),
    signal: AbortSignal.timeout(20000),
    redirect: "error",
  });
  const result = await response.json();
  if (!response.ok || (result.success !== true && result.success !== "true"))
    throw new Error("FormSubmit could not accept your inquiry. Your details are still here. Please try again later or email me.");
}
