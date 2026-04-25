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

      <div className="mt-5 rounded-3xl border border-line bg-white p-4">
        <h3 className="text-lg font-semibold text-text">How labels are used across the site</h3>
        <div className="mt-3 grid gap-3 text-sm text-text/90 md:grid-cols-2">
          <p><strong>Official charge:</strong> based on published tax bands or fee scales.</p>
          <p><strong>Lender charge:</strong> fees tied to mortgage products, valuations or broker work.</p>
          <p><strong>Solicitor/conveyancing estimate:</strong> legal work and disbursement planning ranges.</p>
          <p><strong>Market estimate:</strong> surveys, moving, furnishing or other provider-led costs.</p>
          <p><strong>Optional cost:</strong> useful for planning, but not required on every purchase.</p>
          <p><strong>Situation-dependent cost:</strong> applies only to some properties or buyer types.</p>
        </div>
      </div>
    </section>
  );
}
