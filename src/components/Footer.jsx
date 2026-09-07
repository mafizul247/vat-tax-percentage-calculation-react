import React from "react";

export default function Footer({ t }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer footer-center text-xs text-base-content/40 pb-4 leading-relaxed gap-1">
      <p>{t.footerNote}</p>
      <p>
        © {year} Mafizul Islam ·{" "}
        <a href="mailto:mafizul247@gmail.com" className="link link-hover text-base-content/60">
          mafizul247@gmail.com
        </a>
      </p>
    </footer>
  );
}