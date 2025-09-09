import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies - What Our Early Users Are Saying | MONONIO AI",
  description: "See exactly what MONONIO creates for businesses like yours. Real case studies showing 300% increase in reservations, 150% ROI improvement, and $10K months.",
  keywords: "MONONIO AI case studies, marketing campaign results, AI marketing success stories, small business marketing results",
  openGraph: {
    title: "Case Studies - Real Campaigns, Real Results | MONONIO AI",
    description: "See exactly what MONONIO creates for businesses like yours.",
    type: "website",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
