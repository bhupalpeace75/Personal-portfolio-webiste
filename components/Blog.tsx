import Link from "next/link";
import type { Post } from "@/lib/posts";
export function ArticleCards({ posts }: { posts: Omit<Post, "content">[] }) {
  return (
    <div className="article-grid">
      {posts.map((p, i) => (
        <Link href={"/blog/" + p.slug} key={p.slug} className="article-card">
          <div className={"article-art art-" + (i % 3)} aria-hidden="true">
            <span>{["✦", "↗", "◎"][i % 3]}</span>
            <span>
              {
                [
                  "IDEAS INTO ACTION",
                  "A CLEARER DIRECTION",
                  "INTEREST INTO INQUIRY",
                ][i % 3]
              }
            </span>
          </div>
          <div className="article-meta">
            {p.category}{" "}
            <span>
              {p.status === "review" ? "Review copy · " : ""}
              <time dateTime={p.date}>
                {new Date(p.date + "T00:00:00").toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </span>
          </div>
          <h3>{p.title}</h3>
          <p>{p.excerpt}</p>
          <span className="text-link">Read article ↗</span>
        </Link>
      ))}
    </div>
  );
}
