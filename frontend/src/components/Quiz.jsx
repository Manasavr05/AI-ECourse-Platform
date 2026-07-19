"use client";

import { useState } from "react";

export default function Quiz({ result }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!result?.course?.quiz?.length) {
  return (
    <div className="card">
      <h2>📝 Quiz</h2>
      <p>No quiz available. Please upload a PDF first.</p>
    </div>
  );
}

  const quiz = result.course.quiz;
  const question = quiz[currentQuestion];

  const selectOption = (option) => {
    if (showAnswer) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: option,
    });
  };

  const submitAnswer = () => {
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select an answer.");
      return;
    }

    if (
      selectedAnswers[currentQuestion] ===
      question.correct_answer
    ) {
      setScore(score + 1);
    }

    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion === quiz.length - 1) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setShowAnswer(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round(
      (score / quiz.length) * 100
    );

    return (
      <div className="card">
        <h2>🎉 Quiz Completed</h2>

        <h1>{score} / {quiz.length}</h1>

        <h2>{percentage}%</h2>

        {percentage >= 80 ? (
          <h3 style={{ color: "green" }}>
            Excellent! 🌟
          </h3>
        ) : percentage >= 60 ? (
          <h3 style={{ color: "#2563EB" }}>
            Good Job! 👍
          </h3>
        ) : (
          <h3 style={{ color: "red" }}>
            Keep Practicing 📚
          </h3>
        )}

        <button
          className="primary-btn"
          onClick={restartQuiz}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📝 Quiz</h2>

      <h3>
        Question {currentQuestion + 1} of {quiz.length}
      </h3>

      <br />

      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h3>{question.question}</h3>

        <br />

        {question.options.map((option, index) => {
          const selected =
            selectedAnswers[currentQuestion] === option;

          let background = "white";

          if (showAnswer) {
            if (option === question.correct_answer) {
              background = "#d4edda";
            } else if (selected) {
              background = "#f8d7da";
            }
          } else if (selected) {
            background = "#dbeafe";
          }

          return (
            <div
              key={index}
              onClick={() => selectOption(option)}
              style={{
                padding: "15px",
                marginBottom: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: showAnswer ? "default" : "pointer",
                background,
              }}
            >
              <input
                type="radio"
                checked={selected}
                readOnly
              />

              <span style={{ marginLeft: "10px" }}>
                {option}
              </span>
            </div>
          );
        })}
                {showAnswer && (
          <>
            <br />

            <div
              style={{
                padding: "15px",
                background: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <h3>📖 Explanation</h3>

              <p>{question.explanation}</p>

              <br />

              <strong>Correct Answer:</strong>

              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {question.correct_answer}
              </p>
            </div>
          </>
        )}

        <br />

        {!showAnswer ? (
          <button
            className="primary-btn"
            onClick={submitAnswer}
          >
            Submit Answer
          </button>
        ) : (
          <button
            className="primary-btn"
            onClick={nextQuestion}
          >
            {currentQuestion === quiz.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </div>

      <br />

      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Current Score: {score} / {quiz.length}
      </div>
    </div>
  );
}