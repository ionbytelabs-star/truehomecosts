import Link from "next/link";

import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-[#edf3f1]">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4">
          <p className="eyebrow">Independent and informational</p>
          <h2 className="font-serif text-3xl text-text">Clearer property buying numbers, without the sales pitch.</h2>
          <p className="max-w-prose text-muted">
            TrueHomeCosts.co.uk exists to help UK buyers budget for the deposit, tax and extra costs that
            get missed too often. The site is informational only and is not financial advice.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-text underline decoration-line hover:text-brand-deep">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col gap-2 py-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 {siteConfig.name}. Built for local-first planning and Netlify deployment.</p>
          <p>{siteConfig.email}</p>
        </div>
      </div>
    </footer>
  );
}
