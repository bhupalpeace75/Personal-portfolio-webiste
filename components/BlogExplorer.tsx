"use client";
import { useState } from "react";
import type { Post } from "@/lib/posts";
import { ArticleCards } from "./Blog";
export default function BlogExplorer({
  posts,
}: {
  posts: Omit<Post, "content">[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All articles");
  const categories = ["All articles", ...new Set(posts.map((p) => p.category))];
  const filtered = posts.filter(
    (p) =>
      (category === "All articles" || p.category === category) &&
      (p.title + " " + p.excerpt + " " + p.category)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="blog-controls">
        <div className="category-list" aria-label="Article categories">
          {categories.map((c) => (
            <button
              aria-pressed={c === category}
              key={c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div>
          <label className="sr-only" htmlFor="article-search">
            Search articles
          </label>
          <input
            id="article-search"
            type="search"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <p className="small" role="status">
        {filtered.length} {filtered.length === 1 ? "article" : "articles"} found
      </p>
      {filtered.length ? (
        <ArticleCards posts={filtered} />
      ) : (
        <div className="empty-state">
          <h2>No articles found.</h2>
          <p>Try another keyword or explore all categories.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All articles");
            }}
          >
            Clear search and filters
          </button>
        </div>
      )}
    </>
  );
}
