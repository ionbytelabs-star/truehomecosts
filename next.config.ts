import type { NextConfig } from "next";

const consolidatedPriceGuideRoutes = [
  "/cost-to-buy-225k-house",
  "/cost-to-buy-275k-house",
  "/cost-to-buy-325k-house",
  "/cost-to-buy-350k-house",
  "/cost-to-buy-375k-house",
  "/cost-to-buy-425k-house",
  "/cost-to-buy-450k-house",
  "/cost-to-buy-475k-house"
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      ...consolidatedPriceGuideRoutes.map((source) => ({
        source,
        destination: "/house-buying-cost-by-property-price",
        permanent: true
      })),
      {
        source: "/hidden-costs-buying-new-build-home",
        destination: "/hidden-costs-buying-new-build-home-uk",
        permanent: true
      },
      {
        source: "/hidden-costs-buying-new-build",
        destination: "/hidden-costs-buying-new-build-home-uk",
        permanent: true
      },
      {
        source: "/hidden-costs-of-buying-new-build-home",
        destination: "/hidden-costs-buying-new-build-home-uk",
        permanent: true
      },
      {
        source: "/hidden-costs-of-buying-a-new-build-home",
        destination: "/hidden-costs-buying-new-build-home-uk",
        permanent: true
      },
      {
        source: "/hidden-costs-buying-house-uk",
        destination: "/hidden-costs-buying-house",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
