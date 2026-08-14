import type { GuidePageContent } from "./types";
import { mortgageFeesGuide } from "./mortgage-fees-guide";

const recoveryBacklinks: Record<string, Array<{ href: string; label: string }>> = {
  "hidden-costs-buying-house": [
    { href: "/conveyancing-costs-uk", label: "UK conveyancing costs" },
    { href: "/property-survey-costs-uk", label: "property survey levels and costs" }
  ],
  "hidden-costs-buying-new-build-home-uk": [
    { href: "/conveyancing-costs-uk", label: "conveyancing costs and new-build extras" },
    { href: "/costs-before-completion", label: "payments due before completion" }
  ],
  "stamp-duty-explained": [
    { href: "/land-registry-fees-uk", label: "Land Registry and registration fees" },
    { href: "/costs-before-completion", label: "when completion funds are needed" }
  ],
  "mortgage-fees-costs": [
    { href: "/conveyancing-costs-uk", label: "lender-related conveyancing fees" },
    { href: "/costs-before-completion", label: "costs payable before completion" },
    { href: "/buying-and-selling-house-same-time", label: "home-mover buying and selling costs" },
    { href: "/property-survey-costs-uk", label: "house survey costs and lender valuation differences" }
  ],
  "moving-costs-uk": [
    { href: "/costs-before-completion", label: "costs from exchange through completion" },
    { href: "/buying-and-selling-house-same-time", label: "costs when buying and selling together" }
  ],
  "insurance-costs-uk": [
    { href: "/costs-before-completion", label: "insurance timing around exchange and completion" }
  ],
  "first-year-cost-buying-house-uk": [
    { href: "/property-survey-costs-uk", label: "survey costs by level" }
  ],
  "first-time-buyer-costs": [
    { href: "/conveyancing-costs-uk", label: "legal costs when buying a first home" }
  ],
  "cost-of-owning-home-uk": [
    { href: "/buying-and-selling-house-same-time", label: "home-mover costs" }
  ]
};

function addRecoveryBacklinks(guide: GuidePageContent): GuidePageContent {
  const additions = recoveryBacklinks[guide.slug] ?? [];
  if (additions.length === 0) return guide;

  return {
    ...guide,
    contextualLinks: [
      ...(guide.contextualLinks ?? []).filter(
        (link) => !additions.some((addition) => addition.href === link.href)
      ),
      ...additions
    ]
  };
}

export function applyGuideConsistency(guide: GuidePageContent): GuidePageContent {
  const topicSpecificGuide =
    guide.slug === "mortgage-fees-costs" ? mortgageFeesGuide(guide) : guide;

  return addRecoveryBacklinks(topicSpecificGuide);
}
