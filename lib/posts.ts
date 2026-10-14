import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  status: string;
  content: string;
};
export function getPosts(): Post[] {
  return fs
    .readdirSync(path.join(process.cwd(), "content/blog"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(
        path.join(process.cwd(), "content/blog", f),
        "utf8",
      );
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      if (!match) throw new Error("Missing Markdown front matter: " + f);
      const data = parse(match[1]);
      const content = match[2];
      for (const key of ["title", "excerpt", "category", "date", "status"])
        if (typeof data?.[key] !== "string")
          throw new Error("Invalid " + key + " in " + f);
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
        Number.isNaN(Date.parse(data.date))
      )
        throw new Error("Invalid publication date in " + f);
      if (!["draft", "review", "published"].includes(data.status))
        throw new Error("Use draft, review, or published status in " + f);
      return { ...data, slug: f.replace(/\.md$/, ""), content } as Post;
    })
    .filter((p) => p.status === "published" || p.status === "review")
    .sort((a, b) => b.date.localeCompare(a.date));
}
