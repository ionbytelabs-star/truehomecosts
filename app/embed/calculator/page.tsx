import type { Metadata } from "next";

import { EmbedCalculator } from "@/components/EmbedCalculator";
import { absoluteUrl } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Embeddable UK Home-Buying Cost Calculator",
  description: "A lightweight True Home Costs calculator for publisher and partner websites.",
  alternates: {
    canonical: absoluteUrl("/embed/calculator")
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function EmbedCalculatorPage() {
  return <EmbedCalculator />;
}
