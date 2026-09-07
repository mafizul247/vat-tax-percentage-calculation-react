import React, { useState } from "react";
import SEO from "./components/SEO.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CalculatorForm from "./components/CalculatorForm.jsx";
import ResultReceipt from "./components/ResultReceipt.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";
import { DICT } from "./i18n/translations.js";
import { calculate, parseAmount } from "./utils/calculate.js";

export default function App() {
  const [lang, setLang] = useState("en"); // English is the default language
  const [theme, setTheme] = useState("dark"); // Dark is the default theme
  const t = DICT[lang];
  const bnMode = lang === "bn";

  const [amountInput, setAmountInput] = useState("");
  const [vatRateInput, setVatRateInput] = useState("");
  const [taxRateInput, setTaxRateInput] = useState("");
  const [mode, setMode] = useState("excluding");
  const [result, setResult] = useState(null); // null => result section is hidden
  const [errors, setErrors] = useState([]);
  const [revealKey, setRevealKey] = useState(0);

  // Any change to the inputs after a result exists hides it again, so the
  // receipt on screen can never go out of sync with the form.
  function invalidate() {
    if (result) setResult(null);
    if (errors.length) setErrors([]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const amount = parseAmount(amountInput);
    const vatRateRaw = vatRateInput.trim();
    const taxRateRaw = taxRateInput.trim();
    const vatRate = vatRateRaw === "" ? 0 : parseFloat(vatRateRaw);
    const taxRate = taxRateRaw === "" ? 0 : parseFloat(taxRateRaw);

    const nextErrors = [];
    if (!Number.isFinite(amount) || amount <= 0) nextErrors.push(t.errorAmount);
    if (vatRateRaw !== "" && (!Number.isFinite(vatRate) || vatRate < 0 || vatRate > 100)) {
      nextErrors.push(t.errorVatRate);
    }
    if (taxRateRaw !== "" && (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100)) {
      nextErrors.push(t.errorTaxRate);
    }

    if (nextErrors.length) {
      setResult(null);
      setErrors(nextErrors);
      return;
    }

    setErrors([]);
    setResult({ ...calculate(amount, vatRate, taxRate, mode), amount, vatRate, taxRate, mode });
    setRevealKey((k) => k + 1);
  }

  function handleClear() {
    setAmountInput("");
    setVatRateInput("");
    setTaxRateInput("");
    setMode("excluding");
    setResult(null);
    setErrors([]);
  }

  return (
    <div
      data-theme={theme === "dark" ? "calcdark" : "calclight"}
      className={`min-h-screen bg-base-100 flex justify-center px-4 py-10 sm:py-16 transition-colors ${
        bnMode ? "font-bn" : "font-sans"
      }`}
    >
      <SEO t={t} lang={lang} />

      <div className="w-full max-w-2xl">
        <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
        <Hero t={t} />

        <main>
          <CalculatorForm
            t={t}
            amountInput={amountInput}
            setAmountInput={setAmountInput}
            vatRateInput={vatRateInput}
            setVatRateInput={setVatRateInput}
            taxRateInput={taxRateInput}
            setTaxRateInput={setTaxRateInput}
            mode={mode}
            setMode={setMode}
            errors={errors}
            onSubmit={handleSubmit}
            onClear={handleClear}
            invalidate={invalidate}
          />

          {/* Result — hidden until submit, and hidden again on reload since
              no state is persisted anywhere. */}
          <div aria-live="polite">
            <ResultReceipt result={result} t={t} bnMode={bnMode} revealKey={revealKey} />
          </div>

          {/* <HowItWorks t={t} /> */}
        </main>

        <Footer t={t} />
      </div>
    </div>
  );
}
