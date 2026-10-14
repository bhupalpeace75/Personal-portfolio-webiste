"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const targets = [
  ".hero-copy > *",
  ".hero-visual",
  ".page-intro > *",
  ".split-heading > *",
  ".challenge-grid > div",
  ".service-card",
  ".article-card",
  ".principles > div",
  ".process-grid > div",
  ".about-portrait",
  ".about-grid > div:last-child",
  ".starting-grid > div",
  ".delivery-process > li",
  ".service-detail > div",
  ".faq-section > div",
  ".faq-section > h2",
  ".consult-inner > div",
  ".contact-info",
  ".inquiry-form",
  ".article-layout > h1",
  ".article-layout > .lead",
  ".prose > h2",
  ".prose > p",
].join(",");

export default function ContentMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    const clear = () => {
      observer?.disconnect();
      mutations?.disconnect();
      for (const element of seen) {
        element.removeAttribute("data-content-reveal");
        element.style.removeProperty("--reveal-delay");
      }
      seen.clear();
    };
    const start = () => {
      clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = entry.target as HTMLElement;
            // Content stays visible until its one-time entrance animation starts.
            element.dataset.contentReveal = "visible";
            observer?.unobserve(element);
          }
        },
        { threshold: 0.08 },
      );
      const register = () => {
        for (const element of main.querySelectorAll<HTMLElement>(targets)) {
          if (seen.has(element)) continue;
          seen.add(element);
          const siblings = Array.from(
            element.parentElement?.children || [],
          ).filter((sibling) => sibling.matches(targets));
          element.style.setProperty(
            "--reveal-delay",
            `${Math.min(siblings.indexOf(element), 4) * 65}ms`,
          );
          observer?.observe(element);
        }
      };
      register();
      mutations = new MutationObserver((records) => {
        if (records.some((record) => record.addedNodes.length)) register();
      });
      mutations.observe(main, { childList: true, subtree: true });
    };
    start();
    preference.addEventListener("change", start);
    return () => {
      clear();
      preference.removeEventListener("change", start);
    };
  }, [pathname]);

  return null;
}
