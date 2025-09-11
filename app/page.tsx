import HomePageClient from "./components/HomePageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Replace $15K/Month Agencies with AI Marketing - 90% Less Cost | MONONIO",
  description: "Stop paying $5K-15K/month for agencies. Get better results for $297/month with MONONIO's AI marketing platform. Free demo available.",
  keywords: "AI marketing alternative to agencies, small business marketing automation, replace marketing agency, $297 vs $15000 agency fees, AI marketing platform",
  openGraph: {
    title: "Replace $15K/Month Agencies with AI Marketing - MONONIO",
    description: "Stop paying $5K-15K/month for agencies. Get better results for $297/month.",
    type: "website",
  },
  other: {
    // Schema markup for SEO
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "MONONIO AI Marketing Platform",
      "description": "AI-powered marketing automation platform that replaces expensive agencies",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "297",
        "priceCurrency": "USD",
        "priceValidUntil": "2025-12-31"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "500"
      }
    })
  }
};

export default function Home() {
  return <HomePageClient />;
}
