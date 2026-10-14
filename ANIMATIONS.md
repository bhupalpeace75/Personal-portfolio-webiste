# Content animation

The site uses a small shared client component (`components/ContentMotion.tsx`) and CSS animations in `app/globals.css`. No animation library is required.

- Headings, paragraphs, portraits, service cards, process steps, and article cards rise 18px while fading in over 650ms.
- Sibling items use 65ms staggered delays, capped at 260ms.
- Each element animates once when it enters view. Navigation initializes the new page; newly rendered blog cards are also observed.
- Button arrows move slightly on hover/focus, article artwork responds to hover, and navigation links gain a short animated underline.
- There is no looping movement, parallax, flashing, or animated text replacement.
- All content remains visible without JavaScript or observer support. Keyboard focus cancels entrance animation on the focused content container.
- Reduced-motion preference disables entrances and transitions. Changing that preference while the page is open clears or reinstates the observers.

To adjust intensity, edit the `content-enter` keyframes and duration in `app/globals.css`, or the delay cap in `ContentMotion.tsx`.

Verification: production build and all route/link checks passed. Browser checks confirmed observed entrance styles, final readable opacity, mobile navigation, dynamically filtered blog cards, and no horizontal overflow. Reduced-motion handling was reviewed in code and CSS; the connected browser does not expose a preference-emulation control, so that mode was not tested by changing the browser preference.
