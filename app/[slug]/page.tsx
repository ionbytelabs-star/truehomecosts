import { notFound } from "next/navigation";

import { GuidePageTemplate } from "@/components/GuidePageTemplate";
import { guideMap, guideSummaries } from "@/content/guides";
import { buildMetadata } from "@/lib/metadata";

type GuidePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return guideSummaries.map((guide) => ({
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
    keywords: guide.keywords
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guideMap[slug];

  if (!guide) {
    notFound();
  }

  return <GuidePageTemplate guide={guide} />;
}
