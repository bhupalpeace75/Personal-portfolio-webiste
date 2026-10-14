# Digital Bhupendra portfolio

A complete Next.js 16 / TypeScript website for Bhupendra Shrestha, with responsive CSS, reusable layouts, eight service pages, Markdown articles, and a server-side consultation inquiry endpoint. No analytics or tracking scripts are installed. System fonts avoid external font requests; abstract graphics are original CSS and SVG assets.

## Run locally

Use Node.js 22.9 or newer (Node 24 recommended).

```powershell
cd C:\Users\Acer\Documents\digital-bhupendra
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production run:

To preview all 16 pages, open http://127.0.0.1:3000/preview.html while the local server is running. This page links to every main page, service, and article, and shows both updated portraits. It is marked noindex and is not part of the main navigation.

```powershell
npm test
npm run build
npm start
```

`npm run check` checks TypeScript. With the server running, `node scripts/verify-routes.mjs` checks all page URLs, internal links, consultation anchors, metadata, sharing image, sitemap/robots, and 404s. Set `TEST_BASE_URL` to check another local port.

## Edit business information

Edit `lib/business.ts`: name, brand, title, service area, email, phone, booking URL, photo, social links, and About profile details. The supplied name, phone, email, and “Inside Valley” are retained. Confirm the service area wording before launch. No country code was assumed for the phone number. Add an international phone number if needed for your customers.

Replace the clearly marked personal story, experience/qualifications, and certification placeholders, or remove those sections from `app/about/page.tsx`. Do not add credentials you cannot verify. Missing social links are hidden. Example social entry: `{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/YOUR-PROFILE' }`.

The hero and About sections now use separate AI-generated portraits based on your supplied `p4.jpeg`. Set `heroPhoto` and `aboutPhoto` in `lib/business.ts` to replace them independently. The original PNGs are in `public/portraits/`; Next.js serves responsive optimized versions. See `PORTRAITS.md` for the creation prompts. The `photo` setting remains a shared fallback if either section-specific path is empty.

Edit the proposed service lineup and all service-specific sections in `lib/services.ts`. Keep slugs stable to preserve URLs. Scope, fees, timing, third-party costs, and deliverables must be confirmed before offering services publicly. Homepage editorial copy is in `app/page.tsx`; visual styling is in `app/globals.css`.

## Add or publish blog posts

Add a `.md` file to `content/blog/`. Its filename becomes `/blog/filename`. Use this header followed by original Markdown content:

```yaml
---
title: 'Your article title'
excerpt: 'A useful summary of the article.'
category: 'Marketing strategy'
date: '2026-10-10'
status: draft
---
```

Use quoted ISO dates. `draft` hides an article and its URL; `review` makes it visible with a review badge but excludes it from the sitemap and adds noindex; `published` includes it in the sitemap. The three starter articles are review copies with editable dates, not claims of past publication. Review them, set your intended publication dates, and change their status to `published` before launch. Categories are generated automatically. Search matches titles, excerpts, and categories. Raw HTML is not rendered in Markdown. Rebuild/redeploy after content changes.

## Connect booking

Set `bookingUrl` in `lib/business.ts` to your full HTTPS Calendly or other booking URL. All shared consultation buttons then point to that booking experience, and Contact offers a direct booking link. Until then, buttons open `/contact#consultation`, which is an inquiry form and does not reserve a meeting. External booking availability must be tested after you supply the URL.

## FormSubmit email delivery

The form is connected to `https://formsubmit.co/bhupendrastha2024@gmail.com`. No Resend, Turnstile, API key, or verified sender domain is required. The owner confirmed FormSubmit activation on 13 October 2026.

With JavaScript, the website checks required fields, email, optional HTTP(S) website URL, and lengths locally and through `/api/inquiries`. That endpoint validates only; it never sends mail or reports delivery success. The browser then performs a native POST to FormSubmit. FormSubmit keeps its built-in CAPTCHA enabled and displays its actual submission result. Complete that verification to send an inquiry. No custom thank-you redirect or fake success state is used. Without JavaScript, the browser's native required/email/URL validation and FormSubmit submission remain available.

The email subject is `New consultation inquiry — Digital Bhupendra`. All seven fields are included in the email, with the visitor's email enabling Reply-To. Spam prevention includes the provider CAPTCHA, a honeypot, and a minimum completion time in the enhanced preflight. The button is locked during submission to prevent accidental repeated clicks. Going back from the provider page restores the form button. Inquiries are not saved in a website database or added to a marketing list. FormSubmit retains submissions in its archive for 30 days, as described in its documentation; review your inbox retention practices too.

If you change `business.email` in `lib/business.ts`, the action automatically changes to the new address. Send a test and activate that recipient if prompted. Test again from the final deployed website. Check Inbox and Spam for test inquiries.

Official references: [FormSubmit setup](https://formsubmit.co/), [field options and data retention](https://formsubmit.co/documentation), [privacy policy](https://formsubmit.co/privacy.pdf).
## Deploy

This project needs a Node-capable Next.js host because the inquiry preflight performs server-side validation. It is not a static export.

For Vercel or another Next.js host, import the source repository, choose the Next.js preset, and set the environment variables above in the host dashboard. Use `npm ci` and `npm run build`; for a self-hosted Node server use `npm start` behind an HTTPS reverse proxy. The server must receive the original `Host` header. `NEXT_PUBLIC_SITE_URL` must match the origin visitors use, including `www` if applicable; redirect alternate hostnames to that origin. Keep secrets out of Git and rebuild when public variables change.

Configure your domain and HTTPS, confirm FormSubmit delivery from the deployed site, and then run the route checker against the deployment by setting `TEST_BASE_URL`. Check that the sitemap includes the correct domain and approved articles. Without a site URL the sitemap is deliberately empty; localhost metadata is used only for preview. Recheck a real form delivery after deployment.

## Exact launch checklist

- Provide the final domain / `NEXT_PUBLIC_SITE_URL`.
- Supply a booking URL if you want direct scheduling; the inquiry fallback is already implemented.
- Confirm a FormSubmit test inquiry reaches bhupendrastha2024@gmail.com after completing CAPTCHA.
- Replace or remove the three About placeholders; approve the proposed services and scopes.
- Review the three starter articles, publication dates, and statuses.
- Review the generated hero/About portraits and optionally supply social URLs.
- Confirm “Inside Valley” and the telephone format for your intended service audience.
- Review provider data retention settings and perform an actual delivery/booking test.

See `VERIFICATION.md` for the checks actually performed and remaining verification limits.

## Content animations

Headings, portraits, cards, and sections have subtle one-time scroll entrances. Button arrows and navigation links respond to hover/focus. Motion respects reduced-motion preferences. See ANIMATIONS.md for configuration and verification details.

FormSubmit delivery verification: on 13 October 2026 the owner confirmed activation, completion of the provider security check, the thank-you page, and receipt of the test email at bhupendrastha2024@gmail.com.
