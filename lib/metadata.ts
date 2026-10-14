import type { Metadata } from "next";
import { siteUrl, business } from "./business";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: siteUrl + path } } : {}),
    openGraph: {
      title: title + " | " + business.brand,
      description,
      type: "website",
      ...(siteUrl ? { url: siteUrl + path } : {}),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Digital Bhupendra — Practical marketing powered by AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | " + business.brand,
      description,
      images: ["/opengraph-image"],
    },
  };
}
