import { priceGuideSlugs } from "./price-guide-links";

const strategicGuideMap: Record<string, string[]> = {
  "hidden-costs-buying-house": [
    "how-much-money-needed-buy-house",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "moving-costs-uk",
    "leasehold-costs-uk",
    "insurance-costs-uk"
  ],
  "how-much-money-needed-buy-house": [
    "hidden-costs-buying-house",
    "stamp-duty-explained",
    "first-time-buyer-costs",
    "moving-costs-uk",
    "cost-to-buy-300k-house",
    "cost-to-buy-500k-house"
  ],
  "stamp-duty-explained": [
    "regional-property-costs-uk",
    "land-registry-fees-uk",
    "first-time-buyer-costs",
    "cost-to-buy-300k-house",
    "cost-to-buy-500k-house"
  ],
  "first-time-buyer-costs": [
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "stamp-duty-explained",
    "furnishing-costs-uk",
    "home-buying-schemes-uk"
  ],
  "mortgage-fees-costs": [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "insurance-costs-uk",
    "land-registry-fees-uk",
    "stamp-duty-explained"
  ],
  "moving-costs-uk": [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "furnishing-costs-uk",
    "cost-of-owning-home-uk",
    "first-time-buyer-costs"
  ],
  "insurance-costs-uk": [
    "mortgage-fees-costs",
    "cost-of-owning-home-uk",
    "first-time-buyer-costs",
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house"
  ],
  "leasehold-costs-uk": [
    "hidden-costs-buying-house",
    "stamp-duty-explained",
    "cost-of-owning-home-uk",
    "how-much-money-needed-buy-house",
    "first-time-buyer-costs"
  ],
  "home-buying-schemes-uk": [
    "first-time-buyer-costs",
    "how-much-money-needed-buy-house",
    "stamp-duty-explained",
    "hidden-costs-buying-house"
  ],
  "regional-property-costs-uk": [
    "stamp-duty-explained",
    "land-registry-fees-uk",
    "cost-to-buy-300k-house",
    "cost-to-buy-500k-house",
    "how-much-money-needed-buy-house"
  ],
  "furnishing-costs-uk": [
    "first-time-buyer-costs",
    "moving-costs-uk",
    "cost-of-owning-home-uk",
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house"
  ],
  "cost-of-owning-home-uk": [
    "moving-costs-uk",
    "insurance-costs-uk",
    "leasehold-costs-uk",
    "stamp-duty-explained",
    "how-much-money-needed-buy-house"
  ],
  about: [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "stamp-duty-explained",
    "first-time-buyer-costs"
  ],
  contact: [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "stamp-duty-explained"
  ],
  privacy: [
    "about",
    "contact"
  ],
  cookies: [
    "about",
    "contact"
  ]
};

export function getStrategicGuideSlugs(slug: string): string[] {
  if (priceGuideSlugs.includes(slug as (typeof priceGuideSlugs)[number])) {
    const currentIndex = priceGuideSlugs.indexOf(slug as (typeof priceGuideSlugs)[number]);
    const neighbours = [priceGuideSlugs[currentIndex - 1], priceGuideSlugs[currentIndex + 1]].filter(
      (value): value is (typeof priceGuideSlugs)[number] => Boolean(value)
    );

    return [
      "hidden-costs-buying-house",
      "how-much-money-needed-buy-house",
      "stamp-duty-explained",
      ...neighbours
    ];
  }

  return strategicGuideMap[slug] ?? [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "first-time-buyer-costs"
  ];
}

export function headingToId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
