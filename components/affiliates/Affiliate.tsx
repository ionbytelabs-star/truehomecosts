"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  affiliateDisclosure,
  affiliateRel,
  affiliates,
  getAffiliatePlacement,
  getAffiliatePlacementUrl,
  trackAffiliateClick,
  type AffiliateKey,
  type AffiliatePlacementKey
} from "@/lib/affiliates/config";

type TrackedAffiliateLinkProps = {
  placement: AffiliatePlacementKey;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
};

export function TrackedAffiliateLink({ placement, ariaLabel, className, children }: TrackedAffiliateLinkProps) {
  return (
    <a
      href={getAffiliatePlacementUrl(placement)}
      target="_blank"
      rel={affiliateRel}
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackAffiliateClick(placement)}
    >
      {children}
    </a>
  );
}

export function AffiliateDisclosure({ className = "" }: { className?: string }) {
  return <p className={`text-xs leading-5 text-muted ${className}`.trim()}>{affiliateDisclosure}</p>;
}

export function AffiliateRecommendationCard({
  placement,
  showDisclosure = true
}: {
  placement: AffiliatePlacementKey;
  showDisclosure?: boolean;
}) {
  const details = getAffiliatePlacement(placement);
  const affiliate = affiliates[details.affiliate];
  if (details.presentation === "banner") return null;

  const isCompact = details.presentation === "compact";

  return (
    <section
      aria-label={`${affiliate.name} recommendation`}
      className={
        isCompact
          ? "w-[calc(100vw-4rem)] max-w-xl rounded-2xl border border-brand/20 bg-brand-soft/60 p-4 sm:w-auto sm:max-w-none"
          : "surface h-full overflow-hidden border-brand/20"
      }
    >
      <div className={isCompact ? "" : "border-l-4 border-brand px-5 py-6 sm:px-6"}>
        {showDisclosure ? <AffiliateDisclosure /> : null}
        <h3 className={`${showDisclosure ? "mt-2" : ""} ${isCompact ? "text-lg" : "font-serif text-2xl"} font-semibold text-text`}>
          {details.heading}
        </h3>
        <p className={`${isCompact ? "mt-1 text-sm leading-6" : "mt-2 max-w-prose"} text-muted`}>
          {details.body}
        </p>
        <TrackedAffiliateLink
          placement={placement}
          ariaLabel={`${details.ctaLabel} — ${affiliate.name} (opens in a new tab)`}
          className={
            isCompact
              ? "mt-3 inline-flex min-h-11 items-center font-semibold text-brand-deep underline decoration-2 underline-offset-4"
              : "mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-deep"
          }
        >
          {details.ctaLabel}
        </TrackedAffiliateLink>
      </div>
    </section>
  );
}

export function AffiliateRecommendationGroup({ placements }: { placements: AffiliatePlacementKey[] }) {
  if (placements.length === 0) return null;
  if (placements.length === 1) return <AffiliateRecommendationCard placement={placements[0]} />;

  return (
    <section aria-label="Moving services recommendations" className="space-y-3">
      <AffiliateDisclosure />
      <div className="grid gap-4 md:grid-cols-2">
        {placements.map((placement) => <AffiliateRecommendationCard key={placement} placement={placement} showDisclosure={false} />)}
      </div>
    </section>
  );
}

export function AffiliateBanner({ placement }: { placement: AffiliatePlacementKey }) {
  const details = getAffiliatePlacement(placement);
  const affiliate = affiliates[details.affiliate];
  const banner = affiliate.banner;
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) setImageLoaded(image.naturalWidth > 0);
  }, []);

  if (details.presentation !== "banner") return null;

  if (banner.type === "iframe") {
    return (
      <aside aria-label={`${affiliate.name} advertisement`} className="surface mx-auto w-full max-w-[332px] p-4 text-center">
        <AffiliateDisclosure className="mb-3 text-left" />
        <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl">
          <iframe
            src={banner.src}
            width="300"
            height="250"
            loading="lazy"
            title={banner.title}
            frameBorder="0"
            scrolling="no"
            className="block h-[250px] w-full max-w-[300px]"
          />
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label={`${affiliate.name} advertisement`} className="surface mx-auto w-full max-w-[332px] p-4 text-center">
      <AffiliateDisclosure className="mb-3 text-left" />
      <div className="relative mx-auto aspect-[6/5] w-full max-w-[300px] overflow-hidden rounded-2xl bg-brand-deep">
        <TrackedAffiliateLink
          placement={placement}
          ariaLabel={`Visit ${affiliate.name} to compare home removal quotes (opens in a new tab)`}
          className="relative block h-full w-full max-w-[300px] focus-visible:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span aria-hidden="true" className="absolute inset-0 flex flex-col justify-between bg-brand-deep p-6 text-left text-white">
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{banner.fallback.eyebrow}</span>
              <span className="mt-3 block font-serif text-2xl font-semibold leading-tight">{banner.fallback.heading}</span>
              <span className="mt-3 block text-sm leading-6 text-white/85">{banner.fallback.body}</span>
            </span>
            <span className="inline-flex min-h-11 w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-deep">
              {banner.fallback.cta}
            </span>
          </span>
          {/* Awin supplies and hosts this creative; use its exact remote URL. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={banner.imageSrc}
            alt={banner.alt}
            width="300"
            height="250"
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            data-image-loaded={imageLoaded}
            className={`absolute inset-0 block h-full w-full max-w-[300px] object-cover transition-opacity ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </TrackedAffiliateLink>
      </div>
    </aside>
  );
}

export type { AffiliateKey };
