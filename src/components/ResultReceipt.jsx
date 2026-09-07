import React from "react";
import { formatMoney, receiptClipPath } from "../utils/calculate.js";

const CLIP = receiptClipPath();

export default function ResultReceipt({ result, t, bnMode, revealKey }) {
  if (!result) return null;

  return (
    <div
      key={revealKey}
      className="receipt-reveal bg-base-300/60 border border-base-300 border-b-0 p-6 sm:p-8 pb-10 mb-6"
      style={{ clipPath: CLIP }}
    >
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-xs uppercase tracking-wide text-base-content/40">{t.resultTitle}</p>
        <p className="text-xs text-base-content/40 font-mono">
          {t.resultFor} ৳ {formatMoney(result.amount)}
        </p>
      </div>

      <dl className="mt-4 space-y-3 font-mono">
        <div className="flex justify-between items-baseline pb-3 border-b border-dashed border-base-content/15">
          <dt className={`text-sm text-base-content/60 ${bnMode ? "font-bn" : ""}`}>{t.baseAmountLabel}</dt>
          <dd className="text-base text-base-content">৳ {formatMoney(result.base)}</dd>
        </div>
        <div className="flex justify-between items-baseline pb-3 border-b border-dashed border-base-content/15">
          <dt className={`text-sm text-base-content/60 ${bnMode ? "font-bn" : ""}`}>
            {t.vatWord} ({result.vatRate}%)
          </dt>
          <dd className="text-base text-secondary">৳ {formatMoney(result.vat)}</dd>
        </div>
        <div className="flex justify-between items-baseline pb-3 border-b border-dashed border-base-content/15">
          <dt className={`text-sm text-base-content/60 ${bnMode ? "font-bn" : ""}`}>
            {t.taxWord} ({result.taxRate}%)
          </dt>
          <dd className="text-base text-secondary">৳ {formatMoney(result.tax)}</dd>
        </div>
        <div className="flex justify-between items-baseline pt-1">
          <dt className={`text-base font-semibold text-base-content ${bnMode ? "font-bn" : ""}`}>{t.totalLabel}</dt>
          <dd className="text-2xl font-semibold text-primary">৳ {formatMoney(result.total)}</dd>
        </div>
      </dl>
    </div>
  );
}
