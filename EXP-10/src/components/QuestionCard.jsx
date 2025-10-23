import React, { useState } from "react";

export default function QuestionCard({ data, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const choose = (option) => {
    if (locked) return;
    setSelected(option.id);
    setLocked(true);
    setTimeout(() => {
      onAnswer(!!option.correct);
      setSelected(null);
      setLocked(false);
    }, 700);
  };

  return (
    <div className="card">
      <h2 className="question">{data.question}</h2>
      <div className="options">
        {data.options.map((opt) => (
          <button
            key={opt.id}
            className={`option-btn ${selected === opt.id ? "selected" : ""}`}
            onClick={() => choose(opt)}
            disabled={locked}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
