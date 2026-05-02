export const priceGuideLinks = [
  { slug: "cost-to-buy-150k-house", label: "Cost to buy a £150,000 house" },
  { slug: "cost-to-buy-200k-house", label: "Cost to buy a £200,000 house" },
  { slug: "cost-to-buy-225k-house", label: "Cost to buy a £225,000 house" },
  { slug: "cost-to-buy-250k-house", label: "Cost to buy a £250,000 house" },
  { slug: "cost-to-buy-275k-house", label: "Cost to buy a £275,000 house" },
  { slug: "cost-to-buy-300k-house", label: "Cost to buy a £300,000 house" },
  { slug: "cost-to-buy-325k-house", label: "Cost to buy a £325,000 house" },
  { slug: "cost-to-buy-350k-house", label: "Cost to buy a £350,000 house" },
  { slug: "cost-to-buy-375k-house", label: "Cost to buy a £375,000 house" },
  { slug: "cost-to-buy-400k-house", label: "Cost to buy a £400,000 house" },
  { slug: "cost-to-buy-425k-house", label: "Cost to buy a £425,000 house" },
  { slug: "cost-to-buy-450k-house", label: "Cost to buy a £450,000 house" },
  { slug: "cost-to-buy-475k-house", label: "Cost to buy a £475,000 house" },
  { slug: "cost-to-buy-500k-house", label: "Cost to buy a £500,000 house" },
  { slug: "cost-to-buy-600k-house", label: "Cost to buy a £600,000 house" },
  { slug: "cost-to-buy-750k-house", label: "Cost to buy a £750,000 house" }
] as const;

export const priceGuideLabelMap = Object.fromEntries(
  priceGuideLinks.map((link) => [link.slug, link.label])
) as Record<string, string>;

export const priceGuideSlugs = priceGuideLinks.map((link) => link.slug);

export const nearbyPriceGuideMap: Record<string, string[]> = {
  "cost-to-buy-150k-house": [
    "cost-to-buy-200k-house",
    "cost-to-buy-225k-house",
    "cost-to-buy-250k-house"
  ],
  "cost-to-buy-200k-house": [
    "cost-to-buy-150k-house",
    "cost-to-buy-225k-house",
    "cost-to-buy-250k-house",
    "cost-to-buy-275k-house"
  ],
  "cost-to-buy-225k-house": [
    "cost-to-buy-150k-house",
    "cost-to-buy-200k-house",
    "cost-to-buy-250k-house",
    "cost-to-buy-275k-house"
  ],
  "cost-to-buy-250k-house": [
    "cost-to-buy-200k-house",
    "cost-to-buy-225k-house",
    "cost-to-buy-275k-house",
    "cost-to-buy-300k-house"
  ],
  "cost-to-buy-275k-house": [
    "cost-to-buy-225k-house",
    "cost-to-buy-250k-house",
    "cost-to-buy-300k-house",
    "cost-to-buy-325k-house"
  ],
  "cost-to-buy-300k-house": [
    "cost-to-buy-250k-house",
    "cost-to-buy-275k-house",
    "cost-to-buy-325k-house",
    "cost-to-buy-350k-house"
  ],
  "cost-to-buy-325k-house": [
    "cost-to-buy-275k-house",
    "cost-to-buy-300k-house",
    "cost-to-buy-350k-house",
    "cost-to-buy-375k-house"
  ],
  "cost-to-buy-350k-house": [
    "cost-to-buy-300k-house",
    "cost-to-buy-325k-house",
    "cost-to-buy-375k-house",
    "cost-to-buy-400k-house"
  ],
  "cost-to-buy-375k-house": [
    "cost-to-buy-325k-house",
    "cost-to-buy-350k-house",
    "cost-to-buy-400k-house",
    "cost-to-buy-425k-house"
  ],
  "cost-to-buy-400k-house": [
    "cost-to-buy-350k-house",
    "cost-to-buy-375k-house",
    "cost-to-buy-425k-house",
    "cost-to-buy-450k-house"
  ],
  "cost-to-buy-425k-house": [
    "cost-to-buy-375k-house",
    "cost-to-buy-400k-house",
    "cost-to-buy-450k-house",
    "cost-to-buy-475k-house"
  ],
  "cost-to-buy-450k-house": [
    "cost-to-buy-400k-house",
    "cost-to-buy-425k-house",
    "cost-to-buy-475k-house",
    "cost-to-buy-500k-house"
  ],
  "cost-to-buy-475k-house": [
    "cost-to-buy-425k-house",
    "cost-to-buy-450k-house",
    "cost-to-buy-500k-house",
    "cost-to-buy-600k-house"
  ],
  "cost-to-buy-500k-house": [
    "cost-to-buy-450k-house",
    "cost-to-buy-475k-house",
    "cost-to-buy-600k-house",
    "cost-to-buy-750k-house"
  ],
  "cost-to-buy-600k-house": [
    "cost-to-buy-475k-house",
    "cost-to-buy-500k-house",
    "cost-to-buy-750k-house"
  ],
  "cost-to-buy-750k-house": [
    "cost-to-buy-500k-house",
    "cost-to-buy-600k-house"
  ]
};

export const popularBuyingCostExampleSlugs = [
  "cost-to-buy-200k-house",
  "cost-to-buy-250k-house",
  "cost-to-buy-300k-house",
  "cost-to-buy-350k-house",
  "cost-to-buy-400k-house",
  "cost-to-buy-500k-house"
] as const;

export const guidePagesForPopularExamples = new Set([
  "hidden-costs-buying-house",
  "how-much-money-needed-buy-house",
  "stamp-duty-explained",
  "mortgage-fees-costs",
  "moving-costs-uk",
  "first-time-buyer-costs"
]);

