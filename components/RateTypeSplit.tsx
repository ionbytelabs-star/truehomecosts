type RateTypeSplitProps = {
  officialItems: string[];
  estimateItems: string[];
};

export function RateTypeSplit({ officialItems, estimateItems }: RateTypeSplitProps) {
  return (
    <section className="surface p-5" aria-labelledby="official-vs-estimate-heading">
      <div className="space-y-2">
        <p className="eyebrow">Trust note</p>
        <h2 id="official-vs-estimate-heading" className="font-serif text-3xl text-text">
          Official-rate items vs estimate-led items
        </h2>
        <p className="max-w-prose text-muted">
          TrueHomeCosts separates published rates from market-based assumptions so buyers can see which figures
          are official and which ones are planning estimates.
        </p>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-white p-4">
          <h3 className="text-lg font-semibold text-text">Official or published-reference items</h3>
          <ul className="mt-3 grid gap-2 pl-5 text-sm text-text/90">
            {officialItems.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-line bg-white p-4">
          <h3 className="text-lg font-semibold text-text">Estimate-led items</h3>
          <ul className="mt-3 grid gap-2 pl-5 text-sm text-text/90">
            {estimateItems.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
