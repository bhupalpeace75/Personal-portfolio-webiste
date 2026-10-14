import { PageIntro, ServiceCards, Consult } from "@/components/Site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Marketing Services",
  "Compare eight practical AI and digital marketing services for small and medium businesses.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="SERVICES"
        title="Solve the marketing problem holding you back."
        text="Need more inquiries, better content, or a simpler way to follow up? Explore the services below. We’ll choose a starting point that fits your business, time, and budget."
      />
      <section className="wrap section compact">
        <div className="starting-grid">
          <div>
            <h2>Not sure what to do next?</h2>
            <p>
              Start with a marketing strategy that tells you where to focus.
            </p>
          </div>
          <div>
            <h2>Need the right customers?</h2>
            <p>
              Help people find you through search and ads, then make your
              website easier to act on.
            </p>
          </div>
          <div>
            <h2>Too much to do yourself?</h2>
            <p>
              Build a manageable routine for content, social media, and customer
              follow-up with AI support.
            </p>
          </div>
        </div>
        <ServiceCards />
      </section>
      <Consult />
    </>
  );
}
