import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const routes = [
  "/",
  "/services",
  "/about",
  "/blog",
  "/contact",
  "/services/ai-marketing-strategy",
  "/services/seo",
  "/services/social-media-marketing",
  "/services/content-marketing",
  "/services/paid-advertising",
  "/services/email-marketing-automation",
  "/services/conversion-optimization",
  "/services/ai-tools-workflows",
  "/blog/ai-for-small-business",
  "/blog/practical-marketing-plan",
  "/blog/website-qualified-leads",
];
const titles = new Set();
const links = new Set();
const anchors = [];
for (const route of routes) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200, route);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, route + " title");
  assert.ok(!titles.has(title), "Unique title: " + route);
  titles.add(title);
  assert.ok(/name="description"/.test(html), route + " description");
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, route + " heading");
  for (const [, href] of html.matchAll(/href="([^" ]+)"/g)) {
    if (href.startsWith("/") && !href.startsWith("/_next")) {
      links.add(href.split("#")[0]);
      if (href.includes("#")) anchors.push(href);
    }
  }
}
for (const route of links) {
  assert.equal((await fetch(base + route)).status, 200, "Link target " + route);
}
for (const href of new Set(anchors)) {
  const [route, id] = href.split("#");
  const html = await (await fetch(base + route)).text();
  assert.ok(html.includes('id="' + id + '"'), "Anchor " + href);
}
assert.equal((await fetch(base + "/missing-page")).status, 404);
assert.equal((await fetch(base + "/services/missing-service")).status, 404);
assert.equal((await fetch(base + "/blog/missing-article")).status, 404);
assert.equal((await fetch(base + "/robots.txt")).status, 200);
assert.equal((await fetch(base + "/sitemap.xml")).status, 200);
assert.equal((await fetch(base + "/opengraph-image")).status, 200);
console.log(
  `Verified ${routes.length} direct routes, ${links.size} internal link targets, consultation anchors, unique titles, descriptions, sharing image, sitemap, robots, and 404 responses.`,
);
