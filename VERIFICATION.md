# Verification — updated 14 October 2026

## Current form integration

- The browser first validates with `/api/inquiries`, then sends cleaned fields directly to FormSubmit's AJAX endpoint for `bhupendrastha2024@gmail.com`. The subject remains `New consultation inquiry — Digital Bhupendra` with table formatting.
- Before this update, the owner confirmed live-domain activation and receipt of the native submission test email.
- A real local browser submission through the new endpoint received provider acceptance and displayed the success status while retaining `/contact` in the address bar. Acceptance is not a claim of inbox receipt or a reserved meeting.
- 15 automated tests cover validation, origin checks, honeypot/minimum time, provider rejection, malformed provider responses, network failure, the distinction between validation and delivery, and rate limiting. Provider unit tests use mocks.
- Required-field validation focuses the first invalid field. The loading button is disabled and accepted submissions cannot be accidentally resubmitted by repeated clicks.
- Bounded, hashed in-memory rate records are per server instance and cover the website validation endpoint; they are not a distributed limit on the public provider endpoint. No CAPTCHA-disabling field is sent.
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
- The site is deployed at `https://cafe.bhupendrashrestha.com.np`. A booking URL and social URLs remain optional configuration. Inbox receipt for the new background submission flow requires owner confirmation.
- A full screen-reader audit or WCAG certification has not been performed.

Earlier screenshots are in `verification/`. The current endpoint has no simulated delivery mode.
