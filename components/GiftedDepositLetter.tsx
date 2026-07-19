"use client";

import { useState } from "react";

export const giftedDepositLetterText = `Gifted Deposit Declaration

I, [DONOR FULL NAME], of [DONOR ADDRESS], confirm that I am gifting £[AMOUNT] to [BUYER FULL NAME] to assist with the purchase of [PROPERTY ADDRESS, IF KNOWN].

I am the buyer's [RELATIONSHIP].

The money comes from [BRIEF SOURCE OF FUNDS].

This money is [NON-REPAYABLE / REPAYABLE ON THE FOLLOWING TERMS: ___].

I will not acquire any legal or beneficial interest in the property as a result of providing this money.

I [WILL NOT / WILL] live at the property.

I understand that the mortgage lender and conveyancer may request identification, bank statements and further evidence showing the source of the money.

Signed: __________________
Name: __________________
Date: __________________`;

export function GiftedDepositLetter() {
  const [copyStatus, setCopyStatus] = useState("Copy template");

  async function copyTemplate() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(giftedDepositLetterText);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy template"), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = giftedDepositLetterText;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopyStatus(copied ? "Copied" : "Select and copy the text");
      window.setTimeout(() => setCopyStatus("Copy template"), 2000);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-brand/20 bg-[#f8fbfa]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-brand-soft px-5 py-4">
        <p className="font-semibold text-brand-deep">Gifted Deposit Declaration</p>
        <button
          type="button"
          onClick={copyTemplate}
          className="inline-flex min-w-32 items-center justify-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-deep"
          aria-live="polite"
        >
          {copyStatus}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words p-5 font-sans text-sm leading-7 text-text selection:bg-brand/20">
        {giftedDepositLetterText}
      </pre>
    </div>
  );
}
