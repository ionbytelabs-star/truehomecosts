import Link from "next/link";

import { calculatorMetadata } from "@/data/assumptions/calculator";

type ContentTrustPanelProps = {
  lastReviewed?: string;
  calculatorDataVersion?: string;
};

export function ContentTrustPanel({
  lastReviewed = calculatorMetadata.lastReviewedLabel,
  calculatorDataVersion = calculatorMetadata.dataVersion
}: ContentTrustPanelProps) {
  return (
    <section className="rounded-3xl border border-line bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Content notes</p>
      <div className="mt-3 space-y-3 text-sm text-muted">
        <p>
          Reviewed and maintained by the TrueHomeCosts research team.
        </p>
        <p>
          Our guides are built from official UK tax sources, public cost information and typical market price
          ranges. We separate fixed official charges from variable market estimates so buyers can see which
          figures are certain and which may change.
        </p>
        <p>Last reviewed: {lastReviewed}</p>
        <p>Calculator data version: {calculatorDataVersion}</p>
        <p>
          This content is for general guidance only and is not financial advice. For more detail, read{" "}
          <Link href="/methodology" className="underline hover:text-brand-deep">
            how our estimates work
          </Link>
          {" "}or learn more{" "}
          <Link href="/about" className="underline hover:text-brand-deep">
            about TrueHomeCosts
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
