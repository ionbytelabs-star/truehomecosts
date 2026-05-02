export function Hero() {
  return (
    <section className="section-gap pt-8 sm:pt-10">
      <div className="shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-5">
          <p className="eyebrow">UK home buying cost calculator</p>
          <div className="space-y-3">
            <h1 className="font-serif text-5xl leading-tight text-text sm:text-6xl">
              True Cost of Buying a House UK Calculator
            </h1>
            <p className="max-w-prose text-xl text-muted">
              Estimate the total upfront cost of buying a home, including your deposit, stamp duty or regional
              property tax, legal fees, surveys, mortgage costs, moving costs and a practical buffer.
            </p>
          </div>
          <div className="max-w-2xl rounded-3xl border border-line bg-white/90 p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">Definition</p>
            <p className="mt-3 text-text">
              The true cost of buying a house in the UK is the deposit plus all upfront costs needed to complete
              the purchase. These typically include stamp duty or regional property tax, solicitor fees, searches,
              surveys, mortgage fees, moving costs and a cash buffer. For many buyers, non-deposit upfront costs
              can range from a few thousand pounds to more than £10,000, depending on the property price, buyer
              type and location.
            </p>
            <div className="mt-4">
              <h2 className="text-base font-semibold text-text">Typical upfront costs when buying a house in the UK</h2>
              <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
                <li>Deposit: usually 5% to 20% of the property price</li>
                <li>Stamp duty or regional property tax: £0 to five figures+</li>
                <li>Legal and conveyancing fees: usually around £800 to £1,800+</li>
                <li>Searches and disbursements: usually a few hundred pounds</li>
                <li>Survey costs: around £250 to £1,500+</li>
                <li>Mortgage fees: £0 to £2,000+</li>
                <li>Moving costs: around £300 to £2,000+</li>
                <li>Setup buffer: useful for insurance, furnishings and early ownership costs</li>
              </ul>
            </div>
          </div>
          <p className="max-w-prose rounded-full bg-brand-soft px-4 py-2 text-sm font-medium text-brand-deep">
            Updated for 2026 UK property tax and typical buying cost assumptions.
          </p>
          <p className="max-w-prose text-lg text-text/90">
            Use the calculator to build a plain-English UK property buying cost estimate before you commit to
            a purchase price or rely on a deposit-only savings target.
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
