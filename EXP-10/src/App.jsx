import React, { useState } from "react";
import questions from "./data/questions";
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import ScoreScreen from "./components/ScoreScreen";
import ProgressBar from "./components/ProgressBar";
import Confetti from "react-confetti";

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((s) => s + 1);
    const next = index + 1;
    if (next < questions.length) setIndex(next);
    else setFinished(true);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="app-container">
      {finished && <Confetti />}
      <Header title="🎯 QuizMaster" />
      <ProgressBar value={index} max={questions.length} />

      <main>
        {!finished ? (
          <QuestionCard
            key={questions[index].id}
            data={questions[index]}
            onAnswer={handleAnswer}
          />
        ) : (
          <ScoreScreen
            score={score}
            total={questions.length}
            onRestart={restart}
          />
        )}
      </main>
    </div>
  );
}
