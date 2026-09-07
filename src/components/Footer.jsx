import React from "react";

export default function Footer({ t }) {
  return (
    <footer className="footer footer-center text-xs text-base-content/40 pb-4 leading-relaxed">
      <p>{t.footerNote}</p>
    </footer>
  );
}
