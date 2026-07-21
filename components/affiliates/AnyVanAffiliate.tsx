"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  anyVanAffiliate,
  getAnyVanPlacement,
  getAnyVanPlacementUrl,
  trackAnyVanAffiliateClick,
  type AnyVanPlacementKey
} from "@/lib/affiliates/anyvan";

const affiliateRel = "sponsored nofollow noopener";
const disclosure = "Affiliate link: True Home Costs may earn a commission if you book, at no extra cost to you.";

type AnyVanAffiliateLinkProps = {
  placement: AnyVanPlacementKey;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
};

export function AnyVanAffiliateLink({ placement, ariaLabel, className, children }: AnyVanAffiliateLinkProps) {
  return (
    <a
      href={getAnyVanPlacementUrl(placement)}
      target="_blank"
      rel={affiliateRel}
      aria-label={ariaLabel}
      className={className}
      onClick={() => trackAnyVanAffiliateClick(placement)}
    >
      {children}
    </a>
  );
}

export function AffiliateDisclosure({ className = "" }: { className?: string }) {
  return <p className={`text-xs leading-5 text-muted ${className}`.trim()}>{disclosure}</p>;
}

export function AnyVanRecommendation({ placement }: { placement: AnyVanPlacementKey }) {
  const details = getAnyVanPlacement(placement);
  if (details.presentation === "banner") return null;

  const isCompact = details.presentation === "compact";

  return (
    <aside
      aria-label="AnyVan removal quote recommendation"
      className={
        isCompact
          ? "w-[calc(100vw-4rem)] max-w-xl rounded-2xl border border-brand/20 bg-brand-soft/60 p-4 sm:w-auto sm:max-w-none"
          : "surface overflow-hidden border-brand/20"
      }
    >
      <div className={isCompact ? "" : "border-l-4 border-brand px-5 py-6 sm:px-6"}>
        <AffiliateDisclosure />
        <h3 className={`${isCompact ? "mt-2 text-lg" : "mt-3 font-serif text-2xl"} font-semibold text-text`}>
          {details.heading}
        </h3>
        <p className={`${isCompact ? "mt-1 text-sm leading-6" : "mt-2 max-w-prose"} text-muted`}>
          {details.body}
        </p>
        <AnyVanAffiliateLink
          placement={placement}
          ariaLabel={`${details.ctaLabel} (opens in a new tab)`}
          className={
            isCompact
              ? "mt-3 inline-flex min-h-11 items-center font-semibold text-brand-deep underline decoration-2"
              : "mt-5 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-deep"
          }
        >
          {details.ctaLabel}
        </AnyVanAffiliateLink>
      </div>
    </aside>
  );
}

export function AnyVanBanner() {
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) setImageLoaded(image.naturalWidth > 0);
  }, []);

  return (
    <aside aria-label="AnyVan advertisement" className="surface mx-auto w-full max-w-[332px] p-4 text-center">
      <AffiliateDisclosure className="mb-3 text-left" />
      <div className="relative mx-auto aspect-[6/5] w-full max-w-[300px] overflow-hidden rounded-2xl bg-brand-deep">
        <AnyVanAffiliateLink
          placement="movingGuideBanner"
          ariaLabel="Visit AnyVan to compare home removal quotes (opens in a new tab)"
          className="relative block h-full w-full max-w-[300px] focus-visible:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-between bg-brand-deep p-6 text-left text-white"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-white/70">AnyVan</span>
              <span className="mt-3 block font-serif text-2xl font-semibold leading-tight">Compare removal quotes</span>
              <span className="mt-3 block text-sm leading-6 text-white/85">
                Home removals and man-and-van services across the UK.
              </span>
            </span>
            <span className="inline-flex min-h-11 w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-deep">
              Get a removal quote
            </span>
          </span>
          {/* The Awin-hosted creative must remain a normal img with its supplied remote URL. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src={anyVanAffiliate.banner.imageSrc}
            alt="Compare home removal and man-and-van quotes with AnyVan"
            width="300"
            height="250"
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            data-image-loaded={imageLoaded}
            className={`absolute inset-0 block h-full w-full max-w-[300px] object-cover transition-opacity ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          />
        </AnyVanAffiliateLink>
      </div>
    </aside>
  );
}
