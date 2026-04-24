import type { AssumptionLevel, Jurisdiction } from "@/lib/site";

export type RangeByLevel = Record<AssumptionLevel, number>;

export type PriceBandRange = {
  upTo: number | null;
  low: number;
  average: number;
  high: number;
};

export type JurisdictionRangeMap = Record<Jurisdiction, RangeByLevel>;
