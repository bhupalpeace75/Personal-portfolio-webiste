import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../lib/validation.mjs";
const valid = {
  name: "A Visitor",
  email: "visitor@example.com",
  business: "Sample business",
  website: "",
  phone: "",
  goal: "More relevant inquiries",
  message: "Please discuss suitable marketing options.",
};
test("optional website and phone may be empty", () =>
  assert.deepEqual(validateInquiry(valid).errors, {}));
test("required fields are enforced", () =>
  assert.equal(Object.keys(validateInquiry({}).errors).length, 5));
test("email and unsafe website schemes are rejected", () => {
  const { errors } = validateInquiry({
    ...valid,
    email: "bad@",
    website: "javascript:alert(1)",
  });
  assert.ok(errors.email);
  assert.ok(errors.website);
});
test("full http(s) website URLs are accepted", () =>
  assert.deepEqual(
    validateInquiry({ ...valid, website: "https://example.com/services" })
      .errors,
    {},
  ));
test("oversized input is rejected and values are trimmed", () => {
  assert.ok(
    validateInquiry({ ...valid, message: "x".repeat(5001) }).errors.message,
  );
  assert.equal(
    validateInquiry({ ...valid, name: "  Person  " }).clean.name,
    "Person",
  );
});
