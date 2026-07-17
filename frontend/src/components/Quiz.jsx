"use client";

import { useState } from "react";

export default function Quiz({ result }) {
  const [submitted, setSubmitted] = useState(false);

  if (!result) {
    return (
      <div className="card">
        <h2>📝 Quiz</h2>
        <p>Upload a PDF to generate a quiz.</p>
      </div>
    );
  }

  const quiz = result.course.quiz;

  return (
    <div className="card">
      <h2>📝 Quiz</h2>

      {quiz.map((q, index) => (
        <div key={index} className="quiz-card">
          <h3>Question {index + 1}</h3>

          <p>
            <strong>Q:</strong> {q.question}
          </p>

          <textarea
            className="answer-box"
            placeholder="Type your answer here..."
            rows={4}
          />

          {submitted && (
            <div className="correct-answer">
              <strong>Correct Answer:</strong>

              <p>{q.answer}</p>
            </div>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          className="primary-btn"
          onClick={() => setSubmitted(true)}
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}