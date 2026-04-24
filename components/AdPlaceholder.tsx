type AdPlaceholderProps = {
  label?: string;
};

export function AdPlaceholder({ label = "Ad placeholder" }: AdPlaceholderProps) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-white/60 px-5 py-8 text-center text-sm text-muted">
      {label} - reserved space only, no ad scripts loaded.
    </div>
  );
}
