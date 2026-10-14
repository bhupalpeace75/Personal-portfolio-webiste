import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/business";
import { services } from "@/lib/services";
import { getPosts } from "@/lib/posts";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? [
        "",
        "/services",
        "/about",
        "/blog",
        "/contact",
        ...services.map((s) => "/services/" + s.slug),
        ...getPosts()
          .filter((p) => p.status === "published")
          .map((p) => "/blog/" + p.slug),
      ].map((p) => ({ url: siteUrl + p }))
    : [];
}
