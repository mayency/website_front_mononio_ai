import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MONONIO AI - Marketing Automation Platform",
  description: "Transform your marketing with AI-powered automation. Create, optimize, and scale campaigns across multiple channels with intelligent AI agents.",
  keywords: "AI marketing automation, campaign management, marketing AI, business automation",
  openGraph: {
    title: "MONONIO AI - Marketing Automation Platform",
    description: "Transform your marketing with AI-powered automation.",
    type: "website",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
