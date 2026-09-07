export function formatMoney(n) {
  if (!Number.isFinite(n)) return "0.00";
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Formats an amount as the user types it, adding thousand separators live
 * (e.g. 1,000,000.00) while still allowing a trailing "." or trailing
 * zeros mid-entry (e.g. "1,000." or "1,000.50").
 */
export function formatAmountLive(raw) {
  let cleaned = raw.replace(/[^\d.]/g, "");
  const firstDot = cleaned.indexOf(".");
  if (firstDot !== -1) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, "");
  }

  const [intPartRaw, decPart] = cleaned.split(".");
  const intPart = (intPartRaw || "").replace(/^0+(?=\d)/, "");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decPart !== undefined) {
    return `${withCommas}.${decPart.slice(0, 2)}`;
  }
  return withCommas;
}

/** Strips thousand separators so the display value can be parsed as a number. */
export function parseAmount(formatted) {
  return parseFloat(String(formatted).replace(/,/g, ""));
}

/**
 * Tax is charged on the base amount; VAT is then charged on top of the
 * tax-inclusive amount (Base + Tax) — i.e. the tax amount is itself
 * "vatable". When backing a total out (Including), the deduction works the
 * same way in reverse: Tax comes off the VAT-free amount first.
 *
 * Excluding (the amount does NOT yet include VAT/tax — both are added on top):
 *   Base  = Amount
 *   Tax   = Base × taxRate
 *   VAT   = (Base + Tax) × vatRate
 *   Total = Base + Tax + VAT
 *
 * Including (the amount already includes VAT and tax — both are pulled back out):
 *   Base  = Amount ÷ [(1 + taxRate) × (1 + vatRate)]
 *   Tax   = Base × taxRate
 *   VAT   = (Base + Tax) × vatRate
 *   Total = Base + Tax + VAT   (equals the amount you entered)
 */
export function calculate(amount, vatRatePercent, taxRatePercent, mode) {
  const vr = (vatRatePercent || 0) / 100;
  const tr = (taxRatePercent || 0) / 100;

  if (mode === "including") {
    const base = amount / ((1 + tr) * (1 + vr));
    const tax = base * tr;
    const vat = (base + tax) * vr;
    return { base, vat, tax, total: base + tax + vat };
  }

  const base = amount;
  const tax = base * tr;
  const vat = (base + tax) * vr;
  return { base, vat, tax, total: base + tax + vat };
}

/** A torn/perforated receipt-bottom edge, as a CSS clip-path polygon. */
export function receiptClipPath(teeth = 18) {
  const points = ["0% 0%", "100% 0%", "100% 93%"];
  for (let i = 0; i <= teeth; i++) {
    const x = 100 - (i / teeth) * 100;
    const y = i % 2 === 0 ? 100 : 93;
    points.push(`${x.toFixed(3)}% ${y}%`);
  }
  points.push("0% 93%");
  return `polygon(${points.join(",")})`;
}
