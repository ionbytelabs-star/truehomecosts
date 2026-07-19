export function Hero() {
  return (
    <header className="pb-7 pt-8 sm:pb-8 sm:pt-10">
      <div className="shell">
        <div className="max-w-4xl space-y-4">
          <p className="eyebrow">Free UK budgeting tool</p>
          <h1 className="font-serif text-4xl leading-tight text-text sm:text-5xl lg:text-6xl">
            UK House Buying Cost Calculator
          </h1>
          <p className="max-w-3xl text-lg text-muted sm:text-xl">
            Calculate the total upfront cash needed to buy a home, including your deposit, stamp duty or
            equivalent property tax, legal fees, surveys, mortgage costs and moving expenses.
          </p>
          <p className="inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-semibold text-brand-deep">
            Covers England, Scotland, Wales and Northern Ireland.
          </p>
        </div>
      </div>
    </header>
  );
}
