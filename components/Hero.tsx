export function Hero() {
  return (
    <section className="section-gap pt-8 sm:pt-10">
      <div className="shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-5">
          <p className="eyebrow">UK home buying cost calculator</p>
          <div className="space-y-3">
            <h1 className="font-serif text-5xl leading-tight text-text sm:text-6xl">
              See the true cost of buying a home in seconds
            </h1>
            <p className="max-w-prose text-xl text-muted">
              No signup. No estate agent fluff. Just real numbers.
            </p>
          </div>
          <p className="max-w-prose text-lg text-text/90">
            TrueHomeCosts helps you estimate the total upfront cost of buying property in the UK, including
            deposit, property tax, legal fees, searches, surveys, mortgage costs, moving costs and a buffer
            for the items buyers often forget.
          </p>
        </div>

        <div className="surface relative overflow-hidden p-5 sm:p-6">
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-brand-soft via-white to-[#f6e7ca]" />
          <div className="relative space-y-4">
            <h2 className="font-serif text-2xl text-text">What the total includes</h2>
            <ul className="grid gap-2.5 text-sm text-text sm:grid-cols-2">
              {[
                "Deposit",
                "SDLT, LBTT or LTT",
                "Solicitor and conveyancing",
                "Search fees",
                "Survey costs",
                "Mortgage fees",
                "Registration costs",
                "Optional moving, insurance and furnishing"
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-line bg-white/90 px-4 py-2.5">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">
              Updated for 2026 with central tax data and clearly separated estimate-based planning costs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
