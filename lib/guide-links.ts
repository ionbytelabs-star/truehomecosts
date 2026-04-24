const priceGuideSlugs = [
  "cost-to-buy-250k-house",
  "cost-to-buy-300k-house",
  "cost-to-buy-350k-house",
  "cost-to-buy-400k-house",
  "cost-to-buy-450k-house",
  "cost-to-buy-500k-house"
] as const;

const strategicGuideMap: Record<string, string[]> = {
  "hidden-costs-buying-house": [
    "how-much-money-needed-buy-house",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "moving-costs-uk",
    "first-time-buyer-costs"
  ],
  "how-much-money-needed-buy-house": [
    "hidden-costs-buying-house",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "first-time-buyer-costs",
    "moving-costs-uk"
  ],
  "stamp-duty-explained": [
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "regional-property-costs-uk",
    "first-time-buyer-costs",
    "home-buying-schemes-uk"
  ],
  "first-time-buyer-costs": [
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "home-buying-schemes-uk"
  ],
  "mortgage-fees-costs": [
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "stamp-duty-explained",
    "first-time-buyer-costs",
    "moving-costs-uk"
  ],
  "moving-costs-uk": [
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "first-time-buyer-costs",
    "insurance-costs-uk",
    "cost-of-owning-home-uk"
  ],
  "insurance-costs-uk": [
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "mortgage-fees-costs",
    "first-time-buyer-costs",
    "cost-of-owning-home-uk"
  ],
  "leasehold-costs-uk": [
    "hidden-costs-buying-house",
    "how-much-money-needed-buy-house",
    "taxes-and-fees-uk",
    "cost-of-owning-home-uk",
    "first-time-buyer-costs"
  ],
  "taxes-and-fees-uk": [
    "stamp-duty-explained",
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "regional-property-costs-uk",
    "cost-of-owning-home-uk"
  ],
  "home-buying-schemes-uk": [
    "first-time-buyer-costs",
    "how-much-money-needed-buy-house",
    "stamp-duty-explained",
    "mortgage-fees-costs",
    "hidden-costs-buying-house"
  ],
  "regional-property-costs-uk": [
    "stamp-duty-explained",
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "first-time-buyer-costs",
    "taxes-and-fees-uk"
  ],
  "furnishing-costs-uk": [
    "first-time-buyer-costs",
    "moving-costs-uk",
    "how-much-money-needed-buy-house",
    "hidden-costs-buying-house",
    "cost-of-owning-home-uk"
  ],
  "cost-of-owning-home-uk": [
    "how-much-money-needed-buy-house",
    "insurance-costs-uk",
    "taxes-and-fees-uk",
    "leasehold-costs-uk",
    "first-time-buyer-costs"
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
