import type { ReactNode } from "react";

type CalloutBoxProps = {
  title?: string;
  children: ReactNode;
};

export function CalloutBox({ title = "Practical note", children }: CalloutBoxProps) {
  return (
    <div className="rounded-3xl border border-brand/20 bg-brand-soft/80 p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-deep">{title}</p>
      <div className="mt-2 text-text">{children}</div>
    </div>
  );
}
