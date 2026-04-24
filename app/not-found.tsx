import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell section-gap">
      <div className="surface max-w-2xl p-8">
        <p className="eyebrow">Not found</p>
        <h1 className="mt-4 font-serif text-4xl text-text">That page is not here.</h1>
        <p className="mt-4 text-muted">
          The route may have changed, or it may not be part of the current TrueHomeCosts build.
        </p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-brand px-5 py-3 font-medium text-white">
          Back to the calculator
        </Link>
      </div>
    </section>
  );
}
