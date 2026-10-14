import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/services";
import { PageIntro, CTA, Consult, FAQs } from "@/components/Site";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s
    ? pageMetadata(s.title, s.intro, "/services/" + s.slug)
    : { title: "Service not found" };
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <>
      <div className="wrap breadcrumb">
        <Link href="/services">All services</Link>
        <span> / {s.title}</span>
      </div>
      <PageIntro eyebrow={s.title} title={s.headline} text={s.intro} />
      <div className="wrap">
        <CTA />
        <p className="small hero-offer">
          Start with a free customized digital marketing plan for your business.
        </p>
      </div>
      <section className="section wrap service-detail">
        <div>
          <p className="eyebrow">IS THIS THE RIGHT FIT?</p>
          <h2>Who it is for</h2>
          <p>{s.audience}</p>
          <h3>Problems this addresses</h3>
          <ul>
            {s.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <p className="eyebrow">PROPOSED SCOPE</p>
          <h2>What the service includes</h2>
          <ul>
            {s.includes.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="small">
            We’ll agree on the scope, timing, and costs after discussing your
            needs.
          </p>
        </div>
      </section>
      <section className="section wrap">
        <h2>Practical benefits</h2>
        <ul>
          {s.benefits.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p className="small">
          These are intended benefits, not guaranteed outcomes.
        </p>
      </section>
      <section className="section soft">
        <div className="wrap">
          <p className="eyebrow">HOW WE WORK</p>
          <h2>How we work</h2>
          <ol className="delivery-process">
            {s.process.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
          <div className="service-detail">
            <div>
              <p className="eyebrow">AI WITH PURPOSE</p>
              <h2>How AI helps</h2>
              <p>{s.ai}</p>
            </div>
            <div>
              <p>
                Start with a free customized digital marketing plan for your
                business.
              </p>
              <CTA />
            </div>
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="faq-section">
          <h2>Your questions, answered.</h2>
          <FAQs items={s.faq} />
        </div>
      </section>
      <section className="wrap section compact">
        <p className="eyebrow">WORKS WELL TOGETHER</p>
        <h2>Related services</h2>
        <div className="related-services">
          {s.related.map((slug) => {
            const r = services.find((r) => r.slug === slug)!;
            return (
              <Link className="panel" key={slug} href={"/services/" + slug}>
                <h3>{r.title} ↗</h3>
                <p>{r.short}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <Consult />
    </>
  );
}
