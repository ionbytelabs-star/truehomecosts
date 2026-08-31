import Link from "next/link";

import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-[#edf3f1]">
      <div className="shell py-12">
        <Link href="/" className="mb-8 flex w-fit items-center gap-3">
          <img
            src="/truehomecosts-logo.svg"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 object-contain"
          />
          <div>
            <div className="font-semibold tracking-tight text-text">{siteConfig.name}</div>
            <div className="text-sm text-muted">UK home buying cost guide</div>
          </div>
        </Link>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-text underline decoration-line hover:text-brand-deep"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 border-t border-line/70 pt-5">
          <a
            href="https://www.google.com/preferences/source?q=truehomecosts.co.uk"
            className="rounded-sm text-sm text-muted underline decoration-line hover:text-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[#edf3f1]"
          >
            Add TrueHomeCosts as a Preferred Source on Google
          </a>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col gap-2 py-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 {siteConfig.name}. General UK home-buying cost information.</p>
          <a href={`mailto:${siteConfig.email}`} className="underline hover:text-brand-deep">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
