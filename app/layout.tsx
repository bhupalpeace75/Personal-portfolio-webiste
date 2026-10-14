import type { Metadata } from "next";
import Header from "@/components/Header";
import { Footer } from "@/components/Site";
import ContentMotion from "@/components/ContentMotion";
import { business, siteUrl } from "@/lib/business";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://127.0.0.1:3000"),
  title: {
    default: "Digital Bhupendra | AI Marketing Expert",
    template: "%s | Digital Bhupendra",
  },
  description:
    "Practical AI-powered digital marketing for small and medium businesses. Attract customers, improve follow-up, and make better marketing decisions.",
  openGraph: {
    type: "website",
    siteName: business.brand,
    title: "Digital Bhupendra | AI Marketing Expert",
    description: "Practical AI-powered digital marketing for your business.",
  },
  twitter: { card: "summary_large_image" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <ContentMotion />
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: business.name,
              jobTitle: business.title,
              email: business.email,
              telephone: business.phone,
              ...(siteUrl ? { url: siteUrl } : {}),
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
