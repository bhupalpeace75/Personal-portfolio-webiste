import Link from "next/link";
import { business, bookingHref, consultationMessage } from "@/lib/business";
import { services } from "@/lib/services";
import Brand from "./Brand";
export function CTA({ className = "button" }: { className?: string }) {
  return (
    <Link className={className} href={bookingHref}>
      Book a free consultation call <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Consult() {
  return (
    <section className="consult">
      <div className="wrap consult-inner">
        <div>
          <p className="eyebrow">A FREE PLAN FOR YOUR BUSINESS</p>
          <h2>
            Get your free customized
            <br />
            digital marketing plan.
          </h2>
          <p>{consultationMessage}</p>
        </div>
        <div>
          <CTA />
          <p className="small">Know where to focus and what to do next.</p>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="wrap">
      <div className="footer-grid">
        <div>
          <Brand />
          <p>
            AI-powered marketing made simple.
            <br />
            Reach customers. Follow up. Improve.
          </p>
          <p className="small">
            {business.name} · {business.title}
            <br />
            Service area: {business.area}
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          {[
            ["Home", "/"],
            ["Services", "/services"],
            ["About me", "/about"],
            ["Blog", "/blog"],
            ["Contact", "/contact"],
          ].map(([label, url]) => (
            <Link key={url} href={url}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3>Services</h3>
          {services.map((s) => (
            <Link key={s.slug} href={"/services/" + s.slug}>
              {s.title}
            </Link>
          ))}
        </div>
        <div>
          <h3>Let’s connect</h3>
          <a href={"mailto:" + business.email}>{business.email}</a>
          <a href={"tel:" + business.phone}>{business.phone}</a>
          {business.socials.map((s) => (
            <a key={s.url} href={s.url} rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
          <CTA className="text-link" />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Digital Bhupendra</span>
        <span>Thoughtful marketing. Human judgment.</span>
        <Link href="/contact#privacy">Inquiry privacy</Link>
      </div>
    </footer>
  );
}
export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map((s, i) => (
        <Link
          href={"/services/" + s.slug}
          className="service-card"
          key={s.slug}
        >
          <span className="card-number">
            0{i + 1} <span aria-hidden="true">↗</span>
          </span>
          <h3>{s.title}</h3>
          <p>{s.short}</p>
          <div className="card-benefit">{s.benefit}</div>
        </Link>
      ))}
    </div>
  );
}
export function FAQs({ items }: { items: [string, string][] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
    </section>
  );
}
