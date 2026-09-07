import React from "react";

export default function Hero({ t }) {
  return (
    <div className="relative mb-10 sm:mb-12">
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none -right-2 -top-10 text-[8.5rem] leading-none font-mono text-primary/10"
      >
        ৳
      </span>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-3 relative tracking-tight text-base-content">
        {t.title}
      </h1>
      <p className="max-w-md relative text-base-content/60 leading-relaxed">{t.subtitle}</p>
    </div>
  );
}
