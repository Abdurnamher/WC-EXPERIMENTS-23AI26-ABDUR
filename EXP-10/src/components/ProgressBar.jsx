import React from "react";

export default function ProgressBar({ value, max }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="progress-wrapper">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-text">
        {value}/{max}
      </div>
    </div>
  );
}
