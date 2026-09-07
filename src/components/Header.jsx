import React from "react";

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

export default function Header({ lang, setLang, theme, setTheme, t }) {
  return (
    <header className="navbar bg-base-200/60 rounded-2xl px-4 mb-10 sm:mb-14 border border-base-300 gap-3">
      <div className="flex-1 flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-base-300 text-secondary font-mono text-base border border-base-content/10"
        >
          ৳
        </span>
        <span className="text-sm text-base-content/60">{lang === "bn" ? "বাংলাদেশ" : "Bangladesh"}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={theme === "dark" ? t.themeLight : t.themeDark}
          aria-pressed={theme === "light"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="btn btn-sm btn-ghost btn-circle"
          title={theme === "dark" ? t.themeLight : t.themeDark}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        <div className="join" role="group" aria-label={t.langSwitchLabel}>
          <button
            type="button"
            className={`btn btn-sm join-item ${lang === "en" ? "btn-primary" : "btn-ghost"}`}
            aria-pressed={lang === "en"}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={`btn btn-sm join-item font-bn ${lang === "bn" ? "btn-primary" : "btn-ghost"}`}
            aria-pressed={lang === "bn"}
            onClick={() => setLang("bn")}
          >
            বাং
          </button>
        </div>
      </div>
    </header>
  );
}
