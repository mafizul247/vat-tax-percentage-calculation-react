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
 * VAT and tax are tracked as two separate rates.
 *
 * Excluding (the amount does NOT yet include VAT/tax — both are added on top):
 *   Base  = Amount
 *   VAT   = Amount × vatRate
 *   Tax   = Amount × taxRate
 *   Total = Amount + VAT + Tax
 *
 * Including (the amount already includes VAT and tax — both are pulled back out):
 *   Base  = Amount ÷ (1 + vatRate + taxRate)
 *   VAT   = Base × vatRate
 *   Tax   = Base × taxRate
 *   Total = Base + VAT + Tax   (equals the amount you entered)
 */
export function calculate(amount, vatRatePercent, taxRatePercent, mode) {
  const vr = (vatRatePercent || 0) / 100;
  const tr = (taxRatePercent || 0) / 100;

  if (mode === "including") {
    const base = amount / (1 + vr + tr);
    const vat = base * vr;
    const tax = base * tr;
    return { base, vat, tax, total: base + vat + tax };
  }

  const base = amount;
  const vat = amount * vr;
  const tax = amount * tr;
  return { base, vat, tax, total: base + vat + tax };
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
