import Link from "next/link";

import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-[#edf3f1]">
      <div className="shell py-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-text underline decoration-line hover:text-brand-deep">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="shell flex flex-col gap-2 py-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>(c) 2026 {siteConfig.name}. General UK home-buying cost information.</p>
          <p>{siteConfig.email}</p>
        </div>
      </div>
    </footer>
  );
}
