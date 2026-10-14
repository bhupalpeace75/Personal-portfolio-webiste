"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CTA } from "./Site";
import Brand from "./Brand";
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [path]);
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <div className="wrap header-inner">
        <Brand priority />
        <button
          ref={button}
          className="menu-button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close ✕" : "Menu ☰"}
        </button>
        <nav
          id="main-navigation"
          className={open ? "navigation open" : "navigation"}
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              button.current?.focus();
            }
          }}
        >
          {[
            ["Home", "/"],
            ["Services", "/services"],
            ["About me", "/about"],
            ["Blog", "/blog"],
            ["Contact", "/contact"],
          ].map(([l, h]) => (
            <Link
              aria-current={
                (h === "/" ? path === h : path.startsWith(h))
                  ? "page"
                  : undefined
              }
              key={h}
              href={h}
              onClick={() => setOpen(false)}
            >
              {l}
            </Link>
          ))}
          <CTA />
        </nav>
      </div>
    </header>
  );
}
