import Image from "next/image";
import { business } from "@/lib/business";
import { PageIntro, Consult } from "@/components/Site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "About Bhupendra Shrestha",
  "Meet Bhupendra Shrestha and his practical, business-first approach to AI-powered digital marketing.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT ME"
        title="Marketing advice you can understand and use."
        text="I’m Bhupendra Shrestha, an AI Marketing Expert. I help small and medium business owners turn confusing marketing choices into a clear plan and practical action."
      />
      <section className="section wrap about-grid">
        <div className={`about-portrait ${business.aboutPhoto || business.photo ? "has-portrait" : ""}`}>
          {business.aboutPhoto || business.photo ? (
            <Image
              src={business.aboutPhoto || business.photo}
              alt="Bhupendra Shrestha seated at a desk in a light blue shirt, with a welcoming expression"
              width={1122}
              height={1402}
              sizes="(max-width: 850px) calc(100vw - 36px), 500px"
            />
          ) : (
            <>
              <span className="monogram">BS</span>
              <p>BHUPENDRA SHRESTHA</p>
              <span>AI Marketing Expert · {business.area}</span>
            </>
          )}
        </div>
        <div>
          <p className="eyebrow">MY MISSION</p>
          <h2>
            Make better marketing
            <br />
            easier to put into practice.
          </h2>
          <p>
            Running a business leaves little time to write content, manage ads,
            and learn every new tool. My goal is to make AI-powered marketing
            practical and accessible, so you can focus on the work that matters.
          </p>
          <p>
            I start by understanding your customers, offer, and goals. Then I
            recommend the services and tools that fit—not more software to
            manage.
          </p>
          <h3>A clear plan, followed by useful action.</h3>
          <p>
            We agree on priorities, put them into action, and review progress.
            AI helps with research and routine work. Human judgment keeps the
            message accurate and the decisions grounded in your business.
          </p>
        </div>
      </section>
      <section className="section soft">
        <div className="wrap">
          <p className="eyebrow">PROFILE DETAILS · TO COMPLETE BEFORE LAUNCH</p>
          <h2>The story behind the work.</h2>
          <div className="starting-grid">
            {[
              ["My story", business.personalStory],
              ["Experience & qualifications", business.experience],
              ["Certifications", business.certifications],
            ].map(([h, p]) => (
              <div key={h}>
                <h3>{h}</h3>
                <p className="placeholder">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Consult />
    </>
  );
}
