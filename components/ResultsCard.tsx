import { formatCurrency } from "@/lib/format";

type ResultsCardProps = {
  total: number;
  deposit: number;
  tax: number;
  notes: string[];
};

export function ResultsCard({ total, deposit, tax, notes }: ResultsCardProps) {
  return (
    <div className="surface overflow-hidden">
      <div className="bg-gradient-to-r from-brand-deep via-brand to-[#178c82] px-6 py-5 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">Total upfront cash needed</p>
        <p className="mt-3 font-serif text-5xl">{formatCurrency(total)}</p>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-panel-strong p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-brand-deep">Deposit</p>
          <p className="mt-2 text-2xl font-semibold text-text">{formatCurrency(deposit)}</p>
        </div>
        <div className="rounded-2xl bg-panel-strong p-4">
          <p className="text-sm uppercase tracking-[0.16em] text-brand-deep">Property tax</p>
          <p className="mt-2 text-2xl font-semibold text-text">{formatCurrency(tax)}</p>
        </div>
      </div>

      <div className="border-t border-line px-6 py-5">
        <p className="text-sm font-semibold text-text">Notes</p>
        <ul className="mt-3 grid gap-2 text-sm text-muted">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
