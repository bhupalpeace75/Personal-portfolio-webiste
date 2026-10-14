import { notFound } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import { getPosts } from "@/lib/posts";
import { Consult } from "@/components/Site";
import { ArticleCards } from "@/components/Blog";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPosts().find((p) => p.slug === slug);
  return p
    ? {
        ...pageMetadata(p.title, p.excerpt, "/blog/" + p.slug),
        robots:
          p.status === "review" ? { index: false, follow: true } : undefined,
      }
    : { title: "Article not found" };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getPosts();
  const p = posts.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <article className="article-layout">
        <Link href="/blog" className="text-link">
          ← Back to all articles
        </Link>
        <p className="eyebrow">{p.category}</p>
        <h1>{p.title}</h1>
        <p className="lead">{p.excerpt}</p>
        <div className="article-byline">
          By Bhupendra Shrestha · <time dateTime={p.date}>{p.date}</time>
          {p.status === "review" && (
            <span className="review-badge">
              Review copy · not yet approved for publication
            </span>
          )}
        </div>
        <div className="prose">
          <Markdown>{p.content}</Markdown>
        </div>
      </article>
      <section className="section wrap">
        <p className="eyebrow">KEEP EXPLORING</p>
        <h2>Related articles</h2>
        <ArticleCards posts={posts.filter((a) => a.slug !== slug)} />
      </section>
      <Consult />
    </>
  );
}
