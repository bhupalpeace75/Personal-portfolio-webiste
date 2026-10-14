import { business, consultationMessage } from "@/lib/business";
import { PageIntro } from "@/components/Site";
import InquiryForm from "@/components/InquiryForm";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Book a Free Consultation",
  "Discuss your business goals with Bhupendra Shrestha and get a customized digital marketing plan with actionable next steps.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S TALK"
        title="Not sure what to change? Start with a free plan."
        text={consultationMessage}
      />
      <section className="section compact wrap contact-layout">
        <aside className="contact-info">
          <h2>Book a free consultation call</h2>
          <p>
            Tell me what’s not working and what you want to achieve. We’ll find
            practical ways to reach the right customers and improve your
            marketing.
          </p>
          <h3>What to expect</h3>
          <ul className="expectations">
            <li>Talk about your business, customers, and goals.</li>
            <li>Review your website and current marketing.</li>
            <li>Find practical opportunities to improve.</li>
            <li>
              Get a free customized digital marketing plan with clear next
              steps.
            </li>
          </ul>
          {business.bookingUrl && (
            <a className="button" href={business.bookingUrl}>
              Book a free consultation call ↗
            </a>
          )}
          <h3>Prefer to reach out directly?</h3>
          <a className="text-link" href={"mailto:" + business.email}>
            {business.email}
          </a>
          <a className="text-link" href={"tel:" + business.phone}>
            {business.phone}
          </a>
          <p className="small">Service area: {business.area}</p>
          {business.socials.map((s) => (
            <a className="text-link" key={s.url} href={s.url}>
              {s.label}
            </a>
          ))}
        </aside>
        <InquiryForm />
      </section>
    </>
  );
}
