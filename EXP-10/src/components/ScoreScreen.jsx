import React from "react";

export default function ScoreScreen({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100);

  return (
    <div className="score-screen">
      <h2>Your Score</h2>
      <p className="score-number">
        {score} / {total}
      </p>
      <p className="score-pct">{pct}%</p>

      <div className="score-actions">
        <button onClick={onRestart} className="btn-primary">
          Restart Quiz
        </button>
        <button
          onClick={() =>
            navigator.clipboard?.writeText(
              `I scored ${score}/${total} on QuizMaster!`
            )
          }
          className="btn-ghost"
        >
          Share
        </button>
      </div>
    </div>
  );
}
