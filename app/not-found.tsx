import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section wrap">
      <p className="eyebrow">404 · PAGE NOT FOUND</p>
      <h1>Let’s get you back on track.</h1>
      <p>This page may have moved, or the address may be incomplete.</p>
      <Link href="/" className="button">
        Back to the homepage →
      </Link>{" "}
      <Link href="/services" className="text-link">
        Explore services
      </Link>
    </section>
  );
}
