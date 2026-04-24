import type { ReactNode } from "react";

type ContentSectionProps = {
  title: string;
  children: ReactNode;
};

export function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-serif text-3xl text-text">{title}</h2>
      <div className="space-y-3 text-text/95">{children}</div>
    </section>
  );
}
