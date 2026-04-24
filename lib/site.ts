export const siteConfig = {
  name: "TrueHomeCosts",
  domain: "truehomecosts.co.uk",
  url: "https://truehomecosts.co.uk",
  email: "hello@truehomecosts.co.uk",
  description:
    "TrueHomeCosts helps UK buyers estimate the full upfront cash needed to buy a home, from deposit and property tax to surveys, legal fees, moving costs and practical buffers.",
  strapline: "See the true cost of buying a home in seconds"
} as const;

export const mainNav = [
  { href: "/", label: "Calculator" },
  { href: "/hidden-costs-buying-house", label: "Hidden Costs" },
  { href: "/first-time-buyer-costs", label: "First-Time Buyers" },
  { href: "/stamp-duty-explained", label: "Stamp Duty" },
  { href: "/mortgage-fees-costs", label: "Mortgage Fees" },
  { href: "/moving-costs-uk", label: "Moving Costs" },
  { href: "/about", label: "About" }
] as const;

export const footerNav = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/cookies", label: "Cookies" },
  { href: "/contact", label: "Contact" },
  { href: "/hidden-costs-buying-house", label: "Hidden costs guide" },
  { href: "/how-much-money-needed-buy-house", label: "How much cash do I need?" },
  { href: "/stamp-duty-explained", label: "Stamp duty explained" },
  { href: "/regional-property-costs-uk", label: "Regional costs" }
] as const;

export type Jurisdiction = "england-ni" | "scotland" | "wales";
export type BuyerType = "first-time-buyer" | "home-mover" | "additional-property";
export type AssumptionLevel = "low" | "average" | "high";

export const jurisdictionLabels: Record<Jurisdiction, string> = {
  "england-ni": "England / Northern Ireland",
  scotland: "Scotland",
  wales: "Wales"
};

export const buyerTypeLabels: Record<BuyerType, string> = {
  "first-time-buyer": "First-time buyer",
  "home-mover": "Home mover",
  "additional-property": "Additional property / second home"
};

export const assumptionLevelLabels: Record<AssumptionLevel, string> = {
  low: "Low",
  average: "Average",
  high: "High"
};
