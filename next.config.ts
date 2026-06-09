import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
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
