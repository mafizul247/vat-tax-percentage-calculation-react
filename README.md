# VAT & Tax Calculator

A single-page, bilingual (English default / Bangla) VAT & tax calculator.
React + Vite + Tailwind CSS + DaisyUI. No backend, no database, and no
localStorage / sessionStorage / cookies — everything lives in React state
only, so a page reload always starts fresh with the result hidden.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
index.html                  Static SEO tags (title, description, OG, Twitter, JSON-LD, robots)
public/
  robots.txt                 Crawl rules + sitemap reference
  sitemap.xml                Sitemap
  favicon.svg                Taka-mark favicon
src/
  main.jsx                   App entry, wraps App in HelmetProvider
  App.jsx                    Owns all state (language, theme, form, result) and layout
  index.css                  Tailwind directives, webfonts, receipt-reveal animation
  i18n/translations.js       English + Bangla copy, incl. per-language SEO metadata
  utils/calculate.js         Pure calculation + formatting helpers
  components/
    SEO.jsx                  react-helmet-async: updates <title>/meta/html-lang per language
    Header.jsx                Brand mark, EN/বাং language switch, light/dark theme switch
    Hero.jsx                  Page heading + subtitle
    CalculatorForm.jsx        Amount, VAT rate, Tax rate (all full-width, matching style), mode toggle, submit/clear
    ResultReceipt.jsx         Receipt-style breakdown — renders null until a result exists
    HowItWorks.jsx            Collapsible explanation of both formulas
    Footer.jsx                Privacy / no-storage note
```

## How the calculation works

VAT and tax are tracked as two separate rates, so they can differ per
calculation.

**Excluding** (the amount does not yet include VAT/tax — both are added on top):
```
Base  = Amount
VAT   = Amount × VAT rate
Tax   = Amount × Tax rate
Total = Amount + VAT + Tax
```

**Including** (the amount already includes VAT and tax — both are pulled back out):
```
Base  = Amount ÷ (1 + VAT rate + Tax rate)
VAT   = Base × VAT rate
Tax   = Base × Tax rate
Total = Base + VAT + Tax   (equals the amount you entered)
```

Leaving either the VAT or Tax field empty treats that rate as 0%, so the
calculator also works as a VAT-only or tax-only calculator.

## Result visibility

The result section is `null` until the form is submitted, so nothing shows
on first load. Changing the amount, either rate, or the mode after a result
is shown clears it again, so what's on screen can never drift out of sync
with the form — you always need to press **Calculate** to see a result.
Since no state is persisted anywhere, reloading the page always returns to
the initial, result-hidden state (this also means the theme resets to dark
on reload, by design).

## Light & dark mode

Two DaisyUI themes are defined in `tailwind.config.js`: `calcdark`
(default) and `calclight`. The toggle in the header (sun/moon icon)
switches the app's `data-theme` attribute between them — since almost every
component uses DaisyUI's semantic color tokens (`base-100`, `base-content`,
`primary`, `secondary`, etc.) rather than hard-coded colors, the whole UI
adapts automatically.

## SEO implementation

This is a client-rendered single-page app, so SEO is handled at two layers:

1. **Static, in `index.html`** — a real `<title>`, meta description,
   keywords, `robots`, canonical link, Open Graph tags, Twitter card tags,
   and a `WebApplication` JSON-LD block are present in the HTML source
   itself, so they're visible even to crawlers that don't execute
   JavaScript.
2. **Dynamic, via `react-helmet-async`** (`src/components/SEO.jsx`) —
   when the language is switched, the `<title>`, meta description,
   keywords, canonical link, and the `<html lang>` attribute update to
   match, so the page's metadata always reflects what's on screen.

Also included: semantic landmarks (`header`/`main`/`footer`), a single
`<h1>`, `label`/`fieldset`/`legend` associations on every form field, an
`aria-live` region around the result, and a `robots.txt` + `sitemap.xml`
in `public/`.

**Before deploying**, replace `https://vat-tax-calculation.netlify.app/` in `index.html` and
`src/components/SEO.jsx`/`public/sitemap.xml`/`public/robots.txt` with
your real domain. For the strongest possible SEO on a project like this,
consider prerendering or server-side rendering (e.g. via a static-site
generator or a framework like Next.js/Astro) — a pure client-rendered SPA
depends on the crawler executing JavaScript to see anything beyond the
static tags already baked into `index.html`.

## Notes

- Fonts: Space Grotesk (UI/English), Hind Siliguri (Bangla), IBM Plex Mono
  (all numeric values), loaded via Google Fonts in `src/index.css`.
