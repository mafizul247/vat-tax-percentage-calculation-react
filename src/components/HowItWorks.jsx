import React from "react";

export default function HowItWorks({ t }) {
  return (
    <div className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-2xl mb-8">
      <input type="checkbox" aria-label={t.howTitle} />
      <div className="collapse-title text-sm text-base-content/60">{t.howTitle}</div>
      <div className="collapse-content text-sm text-base-content/60 leading-relaxed space-y-3">
        <p>
          <span className="font-semibold text-base-content">{t.howExcludingLabel}</span>
          <br />
          {t.howExcludingBody}
        </p>
        <p>
          <span className="font-semibold text-base-content">{t.howIncludingLabel}</span>
          <br />
          {t.howIncludingBody}
        </p>
      </div>
    </div>
  );
}
