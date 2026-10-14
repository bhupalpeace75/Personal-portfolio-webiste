import Link from "next/link";
import Image from "next/image";
import { CTA, Consult, ServiceCards, FAQs } from "@/components/Site";
import { business } from "@/lib/business";
import { getPosts } from "@/lib/posts";
import { ArticleCards } from "@/components/Blog";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "AI Marketing Expert",
  "Practical AI-powered digital marketing for small and medium businesses. Attract relevant customers, improve follow-up, and grow with a clear plan.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> {business.title} · {business.area}
          </p>
          <h1>
            Reach more customers
            <br />
            with <em>AI-powered</em>
            <br />
            digital marketing.
          </h1>
          <p className="lead">
            Spending time on marketing but getting too few inquiries? I help
            small and medium businesses reach the right people, follow up with
            interested customers, and work toward more sales using AI-powered
            digital marketing.
          </p>
          <div className="hero-actions">
            <CTA />
            <Link className="button secondary" href="/services">
              Explore my services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="small hero-offer">
            Get a free customized digital marketing plan with clear next steps
            for your business.
          </p>
          <div className="hero-signature">
            <span className="signature-mark">BS</span>
            <div>
              <strong>{business.name}</strong>
              <span>A clear plan. Practical help. Ongoing improvement.</span>
            </div>
          </div>
        </div>
        <div className={`hero-visual ${business.heroPhoto || business.photo ? "has-portrait" : ""}`}>
          {business.heroPhoto || business.photo ? (
            <Image
              src={business.heroPhoto || business.photo}
              alt="Bhupendra Shrestha wearing a navy blazer in a professional portrait"
              className="hero-portrait"
              width={1122}
              height={1402}
              sizes="(max-width: 850px) calc(100vw - 36px), 600px"
              priority
            />
          ) : (
            <>
              <div className="visual-top">
                <span className="status-dot" /> A CLEARER PATH TO GROWTH{" "}
                <span>↗</span>
              </div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="visual-center">
                <span>Your business goals.</span>
                <strong>A clearer plan.</strong>
                <p>AI tools. Practical marketing. Human care.</p>
              </div>
              <div className="visual-chip chip-one">
                <span>01 / ATTRACT</span>Reach the right people <b>↗</b>
              </div>
              <div className="visual-chip chip-two">
                <span>02 / CONNECT</span>Turn interest into inquiries <b>↗</b>
              </div>
              <div className="visual-chip chip-three">
                <span>03 / GROW</span>Follow up. Learn. Improve. <b>↗</b>
              </div>
              <div className="visual-bottom">
                A practical approach, built around your business.<span>✦</span>
              </div>
            </>
          )}
        </div>
      </section>
      <div className="outcome-strip">
        <div className="wrap">
          <span>Built for small & medium businesses</span>
          <span>Reach the right customers</span>
          <span>Better follow-up</span>
          <span>Know what’s working</span>
        </div>
      </div>
      <section className="section wrap">
        <div className="split-heading">
          <div>
            <p className="eyebrow">SOUND FAMILIAR?</p>
            <h2>
              Putting in the effort.
              <br />
              Still waiting for sales?
            </h2>
          </div>
          <p>
            You post, run ads, and try new tools. But the inquiries are slow,
            customers don’t follow through, and you’re unsure what to change. A
            clear plan can help you focus on the next useful step.
          </p>
        </div>
        <div className="challenge-grid">
          {[
            "Too few inquiries from the right customers",
            "Posts and ads get attention, but few sales",
            "Marketing takes time you need for your business",
            "Too many AI tools, no idea where to start",
            "Your business is hard to find online",
            "Interested customers get lost in follow-up",
          ].map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              <h3>{s}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="section soft">
        <div className="wrap">
          <div className="split-heading">
            <div>
              <p className="eyebrow">HOW I CAN HELP</p>
              <h2>
                From marketing problems
                <br />
                to practical next steps.
              </h2>
            </div>
            <div>
              <p>
                I connect strategy, content, ads, and follow-up so your
                marketing has a clear purpose. AI helps with research and
                routine tasks; I keep the work focused on your customers and
                goals.
              </p>
              <Link className="text-link" href="/services">
                Compare all services ↗
              </Link>
            </div>
          </div>
          <ServiceCards />
        </div>
      </section>
      <section className="section wrap approach">
        <div>
          <p className="eyebrow">WHY WORK WITH ME</p>
          <h2>
            Simple advice.
            <br />
            <em>Support that fits.</em>
          </h2>
          <p className="lead">
            You don’t need every tool. You need the right next step.
          </p>
          <Link href="/about" className="text-link">
            Meet Bhupendra ↗
          </Link>
        </div>
        <div className="principles">
          {[
            [
              "Built around your business",
              "Start with your customers, goals, time, and budget—not a ready-made package.",
            ],
            [
              "Plain, clear advice",
              "Know what we’re doing, why it matters, and what comes next.",
            ],
            [
              "AI with human review",
              "Use AI to speed up routine work. Check the facts, message, and fit before anything reaches customers.",
            ],
            [
              "Focus on useful results",
              "Review inquiries, follow-up, and sales feedback—not just likes and clicks.",
            ],
          ].map(([h, p]) => (
            <div key={h}>
              <span aria-hidden="true">↗</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section navy">
        <div className="wrap">
          <p className="eyebrow">HOW WE WORK TOGETHER</p>
          <h2>
            Understand the problem.
            <br />
            Build the next step.
          </h2>
          <div className="process-grid">
            {[
              "Understand your business and customers",
              "Review what you’re doing now",
              "Build a plan around your goals",
              "Put agreed actions and tools to work",
              "Check progress and make improvements",
            ].map((s, i) => (
              <div key={s}>
                <span>0{i + 1}</span>
                <h3>{s}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap">
        <div className="split-heading">
          <div>
            <p className="eyebrow">IDEAS YOU CAN PUT TO WORK</p>
            <h2>
              Simple ideas.
              <br />
              Useful next steps.
            </h2>
          </div>
          <Link className="text-link" href="/blog">
            Explore the blog ↗
          </Link>
        </div>
        <ArticleCards posts={getPosts()} />
      </section>
      <section className="section soft">
        <div className="wrap faq-section">
          <div>
            <p className="eyebrow">GOOD QUESTIONS</p>
            <h2>
              Let’s make
              <br />
              marketing clearer.
            </h2>
          </div>
          <FAQs
            items={[
              [
                "What is AI-powered digital marketing?",
                "It means using AI to help with research, content drafts, and routine marketing tasks. I guide the strategy and review the work so it fits your business.",
              ],
              [
                "Can these services help a small business?",
                "These services are designed for small and medium businesses. We start with your goals, time, and budget to find a practical starting point.",
              ],
              [
                "What happens during the free consultation?",
                "We discuss your goals, review your current marketing, and identify opportunities. You get a free customized digital marketing plan with clear steps you can start using.",
              ],
              [
                "Do I need existing marketing tools?",
                "No. We review what you already use before recommending anything new. Each tool should solve a real problem.",
              ],
              [
                "How will we measure progress?",
                "We agree on what matters to your business, such as suitable inquiries, customer follow-up, and sales feedback. Then we use that information to improve the work.",
              ],
              [
                "How soon can marketing produce results?",
                "It depends on your business, starting point, budget, competition, and strategy. We’ll discuss realistic expectations; results are not guaranteed.",
              ],
            ]}
          />
        </div>
      </section>
      <Consult />
    </>
  );
}
