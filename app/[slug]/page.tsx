import { notFound } from "next/navigation";

import { GuidePageTemplate } from "@/components/GuidePageTemplate";
import { MortgageFeesPage } from "@/components/MortgageFeesPage";
import { guideMap, guideSummaries } from "@/content/guides";
import { buildMetadata } from "@/lib/metadata";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return guideSummaries
    .filter(
      (guide) => guide.slug !== "cost-of-owning-home-uk" && guide.slug !== "land-registry-fees-uk"
    )
    .map((guide) => ({
      slug: guide.slug
    }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideMap[slug];

  if (!guide) {
    return {};
  }

  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/${guide.slug}`,
    keywords: guide.keywords,
    absoluteTitle: guide.slug === "mortgage-fees-costs"
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideMap[slug];

  if (!guide) {
    notFound();
  }

  if (guide.slug === "mortgage-fees-costs") {
    return <MortgageFeesPage guide={guide} />;
  }

  return <GuidePageTemplate guide={guide} />;
}
