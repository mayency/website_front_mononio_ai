import MarketingPageClient from "./components/MarketingPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mononio AI - Marketing Automation",
  description: "Transform your marketing with AI"
};

export default function MarketingPage() {
  return <MarketingPageClient />;
}
