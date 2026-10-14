# Verification — updated 13 October 2026

## Current form integration

- The form posts to `https://formsubmit.co/bhupendrastha2024@gmail.com`, using the subject `New consultation inquiry — Digital Bhupendra` and table formatting.
- A real browser test reached FormSubmit's activation page. FormSubmit reported that it sent an activation email; the owner confirmed clicking the activation link successfully.
- A second real browser submission passed website validation and reached the activated provider's CAPTCHA page. The owner confirmed completing CAPTCHA, seeing the thank-you page, and receiving the test email at bhupendrastha2024@gmail.com.
- 12 automated tests pass: client/server required fields, email and URL validation, input limits, same-origin checks, honeypot/minimum time, malformed input, canonical-origin handling, and the distinction between validation and delivery.
- Native provider submission retains CAPTCHA. The website does not announce delivery success during preflight, fake an email receipt, or reserve a consultation time.
- Browser required-field validation focuses the first invalid field. Submitted test data reached the provider. Repeat clicks are locked while opening submission.
- No Resend or Turnstile credentials are required. Privacy copy describes FormSubmit processing and its 30-day submission archive.

## Website checks

- Production build and TypeScript checks pass on Next.js 16.4.0.
- All 16 content URLs and internal links, consultation anchors, unique titles/descriptions, sharing image, robots, sitemap endpoint, and missing-page 404 responses pass.
- Prior browser checks covered all pages at mobile width and representative tablet/desktop widths with no horizontal overflow or broken images.
- Both generated portraits load in their respective hero/About sections. The supplied green logo is used in header/footer and browser icon.
- Mobile navigation, keyboard menu/FAQ controls, blog keyword search, filtering, empty state, reset, and article navigation were checked.
- Content entrance styles, readable final opacity, mobile navigation, and animation of filtered article cards were checked. Reduced-motion handling is implemented; the browser tool lacks preference emulation. See `ANIMATIONS.md`.

## Remaining limits

- Inbox delivery was confirmed by the owner; the assistant does not have direct access to the Gmail inbox.
- Production domain/DNS/HTTPS, final deployed-site delivery checks, optional booking URL, and social URLs remain unconfigured.
- A full screen-reader audit or WCAG certification has not been performed.

Saved screenshots are in `verification/`. Earlier Resend delivery mocks were replaced by current FormSubmit preflight tests; the live website has no simulated delivery mode.
