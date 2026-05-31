import type { FAQItem } from "@/content/types";

type FAQSectionProps = {
  items: FAQItem[];
  defaultOpen?: boolean;
};

export function FAQSection({ items, defaultOpen = false }: FAQSectionProps) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <p className="eyebrow">FAQ</p>
        <h2 className="font-serif text-3xl text-text">Questions buyers usually ask</h2>
      </div>

      <div className="grid gap-3">
        {items.map((faq) => (
          <details key={faq.question} className="surface group p-4" open={defaultOpen}>
            <summary className="cursor-pointer list-none pr-6 text-lg font-semibold text-text marker:hidden">
              {faq.question}
            </summary>
            <p className="mt-3 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
