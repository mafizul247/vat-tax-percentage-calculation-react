import React, { useId } from "react";
import { formatAmountLive } from "../utils/calculate.js";

export default function CalculatorForm({
  t,
  amountInput,
  setAmountInput,
  vatRateInput,
  setVatRateInput,
  taxRateInput,
  setTaxRateInput,
  mode,
  setMode,
  errors,
  onSubmit,
  onClear,
  invalidate,
}) {
  const amountId = useId();
  const vatRateId = useId();
  const taxRateId = useId();
  const errorId = useId();

  const hasError = errors && errors.length > 0;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={hasError ? errorId : undefined}
      className="card bg-base-200 border border-base-300 rounded-2xl p-6 sm:p-8 mb-6"
    >
      <p className="text-xs uppercase tracking-wide text-base-content/40 mb-6">{t.formLegend}</p>

      {/* Amount */}
      <div className="form-control mb-6">
        <label htmlFor={amountId} className="label pb-1.5">
          <span className="label-text text-base-content">{t.amountLabel}</span>
        </label>
        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-mono text-secondary"
          >
            ৳
          </span>
          <input
            id={amountId}
            type="text"
            inputMode="decimal"
            placeholder={t.amountPlaceholder}
            value={amountInput}
            onChange={(e) => {
              setAmountInput(formatAmountLive(e.target.value));
              invalidate();
            }}
            className="input input-bordered w-full pl-9 text-lg font-mono bg-base-300/40 focus:outline-primary"
          />
        </div>
        <label className="label pt-1.5">
          <span className="label-text-alt text-base-content/40">{t.amountHint}</span>
        </label>
      </div>

      {/* VAT rate — same full-width treatment as Amount */}
      <div className="form-control mb-6">
        <label htmlFor={vatRateId} className="label pb-1.5">
          <span className="label-text text-base-content">{t.vatRateLabel}</span>
        </label>
        <div className="relative">
          <input
            id={vatRateId}
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            max="100"
            placeholder={t.vatRatePlaceholder}
            value={vatRateInput}
            onChange={(e) => {
              setVatRateInput(e.target.value);
              invalidate();
            }}
            className="input input-bordered w-full pr-9 text-lg font-mono bg-base-300/40 focus:outline-primary"
          />
          <span
            aria-hidden="true"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-mono text-base-content/50"
          >
            %
          </span>
        </div>
        <label className="label pt-1.5">
          <span className="label-text-alt text-base-content/40">{t.vatRateHint}</span>
        </label>
      </div>

      {/* Tax rate — same full-width treatment as Amount */}
      <div className="form-control mb-6">
        <label htmlFor={taxRateId} className="label pb-1.5">
          <span className="label-text text-base-content">{t.taxRateLabel}</span>
        </label>
        <div className="relative">
          <input
            id={taxRateId}
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            max="100"
            placeholder={t.taxRatePlaceholder}
            value={taxRateInput}
            onChange={(e) => {
              setTaxRateInput(e.target.value);
              invalidate();
            }}
            className="input input-bordered w-full pr-9 text-lg font-mono bg-base-300/40 focus:outline-primary"
          />
          <span
            aria-hidden="true"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-mono text-base-content/50"
          >
            %
          </span>
        </div>
        <label className="label pt-1.5">
          <span className="label-text-alt text-base-content/40">{t.taxRateHint}</span>
        </label>
      </div>

      {/* Mode */}
      <fieldset className="mb-2">
        <legend className="label-text text-base-content mb-2 block">{t.modeLabel}</legend>
        <div role="radiogroup" className="grid grid-cols-2 gap-3">
          {[
            { value: "excluding", label: t.modeExcluding, hint: t.modeExcludingHint },
            { value: "including", label: t.modeIncluding, hint: t.modeIncludingHint },
          ].map((opt) => {
            const active = mode === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  setMode(opt.value);
                  invalidate();
                }}
                className={`text-left rounded-xl px-4 py-3 border transition-colors ${
                  active ? "bg-primary/10 border-primary" : "bg-base-300/40 border-base-300"
                }`}
              >
                <span className={`block text-sm font-semibold mb-0.5 ${active ? "text-primary" : "text-base-content"}`}>
                  {opt.label}
                </span>
                <span className="block text-xs text-base-content/60 leading-snug">{opt.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {hasError && (
        <div
          id={errorId}
          role="alert"
          className="alert alert-error mt-4 py-2 text-sm bg-error/10 text-error border border-error/30 flex-col items-start gap-1"
        >
          {errors.map((msg) => (
            <span key={msg}>{msg}</span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-7">
        <button type="submit" className="btn btn-primary flex-1">
          {t.submit}
        </button>
        <button type="button" onClick={onClear} className="btn btn-outline">
          {t.clear}
        </button>
      </div>
    </form>
  );
}
