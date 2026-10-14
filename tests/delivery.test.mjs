import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
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
  requestId: randomUUID(),
});
const request = (body = data(), origin = "https://example.com") =>
  new Request("https://example.com/api/inquiries", {
    method: "POST",
    headers: { Origin: origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const env = { INQUIRY_TO: "owner@example.com" };
test("sends validated fields to FormSubmit AJAX and only reports confirmed acceptance", async () => {
  const r = await handleInquiry(request(), env, async (url, options) => {
    assert.equal(url, "https://formsubmit.co/ajax/owner%40example.com");
    const body = JSON.parse(options.body);
    assert.equal(body.email, "test@example.com");
    assert.equal(body._subject, "New consultation inquiry — Digital Bhupendra");
    assert.equal(body.requestId, undefined);
    assert.equal(body._captcha, undefined);
    return Response.json({ success: "true" });
  });
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { accepted: true });
});

test("provider failures, unconfirmed responses and network errors never show success", async () => {
  for (const mock of [
    async () => Response.json({ success: false }, { status: 500 }),
    async () => Response.json({ message: "Activate form" }),
    async () => new Response("not json"),
    async () => { throw new Error("timeout"); },
  ]) {
    const r = await handleInquiry(new Request(request(), { headers: { Origin: "https://example.com", "Content-Type": "application/json", "x-forwarded-for": randomUUID() } }), env, mock);
    assert.equal(r.status, 502);
    assert.equal((await r.json()).accepted, undefined);
  }
});

test("concurrent duplicate requests share one provider submission", async () => {
  const input = data();
  let sends = 0;
  const mock = async () => { sends++; return Response.json({ success: true }); };
  const results = await Promise.all([handleInquiry(request(input), env, mock), handleInquiry(request(input), env, mock)]);
  assert.equal(sends, 1);
  assert.ok(results.every(r => r.status === 200));
});

test("rate limit stops repeated distinct submissions", async () => {
  const address = randomUUID();
  const mock = async () => Response.json({ success: true });
  for (let i = 0; i < 6; i++) {
    const r = await handleInquiry(new Request(request(), { headers: { Origin: "https://example.com", "Content-Type": "application/json", "x-forwarded-for": address } }), env, mock);
    assert.equal(r.status, i === 5 ? 429 : 200);
  }
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
