import React from "react";
import { Helmet } from "react-helmet-async";

// Replace with your real deployed domain before going live.
const SITE_URL = "https://vat-tax-calculation.netlify.app/";

export default function SEO({ t, lang }) {
  return (
    <Helmet htmlAttributes={{ lang: t.htmlLang }}>
      <title>{t.metaTitle}</title>
      <meta name="description" content={t.metaDescription} />
      <meta name="keywords" content={t.metaKeywords} />
      <link rel="canonical" href={SITE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={t.metaTitle} />
      <meta property="og:description" content={t.metaDescription} />
      <meta property="og:locale" content={lang === "bn" ? "bn_BD" : "en_US"} />
      <meta property="og:url" content={SITE_URL} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={t.metaTitle} />
      <meta name="twitter:description" content={t.metaDescription} />
    </Helmet>
  );
}
