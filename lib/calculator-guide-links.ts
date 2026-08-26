export type CalculatorGuideLink = {
  href: `/${string}`;
  label: string;
};

export const calculatorGuideLinks: Readonly<Partial<Record<string, CalculatorGuideLink>>> = {
  "property-tax": {
    href: "/stamp-duty-explained",
    label: "Understand this property tax"
  },
  solicitors: {
    href: "/conveyancing-costs-uk",
    label: "See conveyancing cost details"
  },
  "mortgage-fees": {
    href: "/mortgage-fees-costs",
    label: "Understand mortgage fees"
  },
  "land-registry": {
    href: "/land-registry-fees-uk",
    label: "See registration fee details"
  },
  moving: {
    href: "/moving-costs-uk",
    label: "Plan moving costs"
  }
};
