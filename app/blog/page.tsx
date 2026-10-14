import { PageIntro, Consult } from "@/components/Site";
import BlogExplorer from "@/components/BlogExplorer";
import { getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Practical Marketing Blog",
  "Accessible guides to AI, digital marketing strategy, and generating qualified website inquiries.",
  "/blog",
);
export default function Blog() {
  return (
    <>
      <PageIntro
        eyebrow="THE BLOG"
        title="Simple answers to your marketing questions."
        text="Learn how to use AI, plan your marketing, and turn website interest into inquiries. Clear advice for busy business owners."
      />
      <section className="section compact wrap">
        <BlogExplorer posts={getPosts().map(({ content, ...p }) => p)} />
      </section>
      <Consult />
    </>
  );
}
