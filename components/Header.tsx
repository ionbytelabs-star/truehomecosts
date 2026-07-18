import Link from "next/link";

import { mainNav, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-line/80 bg-white/85 backdrop-blur">
      <div className="shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/truehomecosts-logo.svg"
            alt=""
            width={52}
            height={52}
            className="h-12 w-12 shrink-0 object-contain"
          />
          <div>
            <div className="font-semibold tracking-tight text-text">{siteConfig.name}</div>
            <div className="text-sm text-muted">UK home buying cost guide</div>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="flex w-full min-w-0 flex-wrap items-center gap-2 text-sm md:w-auto">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 font-medium text-text transition hover:bg-brand-soft hover:text-brand-deep"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
