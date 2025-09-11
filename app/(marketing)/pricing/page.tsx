import PricingPageClient from "@/app/(marketing)/pricing/components/PricingPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MONONIO AI Pricing - Stop Paying $15K/Month to Agencies",
  description: "Get better marketing results for 90% less cost. Professional AI marketing automation starting at $297/month. Compare with traditional agencies.",
  keywords: "AI marketing pricing, marketing automation cost, agency alternative, marketing ROI, campaign management pricing",
  openGraph: {
    title: "MONONIO AI Pricing - Stop Paying $15K/Month to Agencies",
    description: "Get better marketing results for 90% less cost with AI automation.",
    type: "website",
  },
};

export default function PricingPage() {
  return <PricingPageClient />;
} 