import { test } from "node:test";
import assert from "node:assert/strict";
import { handleInquiry } from "../lib/inquiries.mjs";
const data = () => ({
  name: "Test Visitor",
  email: "test@example.com",
  business: "Test business",
  goal: "Qualified inquiries",
  message: "Test validation",
  website: "",
  phone: "",
  _honey: "",
  startedAt: Date.now() - 5000,
});
const request = (body = data(), origin = "https://example.com") =>
  new Request("https://example.com/api/inquiries", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
test("valid preflight needs no email credentials and never claims delivery", async () => {
  const r = await handleInquiry(request(), {});
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { validated: true });
});
test("server rejects invalid fields", async () => {
  const r = await handleInquiry(request({ ...data(), email: "bad" }), {});
  assert.equal(r.status, 422);
  assert.ok((await r.json()).errors.email);
});
test("foreign origins are rejected", async () =>
  assert.equal(
    (await handleInquiry(request(data(), "https://other.example"), {})).status,
    403,
  ));
test("honeypot and immediate submissions are rejected", async () => {
  assert.equal(
    (await handleInquiry(request({ ...data(), _honey: "bot" }), {})).status,
    400,
  );
  assert.equal(
    (await handleInquiry(request({ ...data(), startedAt: Date.now() }), {}))
      .status,
    400,
  );
});
test("unsafe optional URL is rejected on server", async () =>
  assert.equal(
    (
      await handleInquiry(
        request({ ...data(), website: "javascript:alert(1)" }),
        {},
      )
    ).status,
    422,
  ));
test("configured canonical origin is enforced", async () =>
  assert.equal(
    (
      await handleInquiry(request(), {
        NEXT_PUBLIC_SITE_URL: "https://different.example",
      })
    ).status,
    403,
  ));
test("malformed body and excessive input are rejected", async () => {
  const malformed = new Request("https://example.com/api/inquiries", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
      "Content-Type": "application/json",
    },
    body: "{",
  });
  assert.equal((await handleInquiry(malformed, {})).status, 400);
  assert.equal(
    (
      await handleInquiry(
        request({ ...data(), message: "x".repeat(21000) }),
        {},
      )
    ).status,
    413,
  );
});
