"use client";

import { useState } from "react";

export default function AITutor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Error connecting to AI Tutor.");
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>🤖 AI Tutor</h2>

      <p>Ask anything about your uploaded PDF.</p>

      <textarea
        rows={4}
        className="answer-box"
        placeholder="Ask your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br />
      <br />

      <button
        className="primary-btn"
        onClick={askAI}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <>
          <hr style={{ margin: "25px 0" }} />

          <h3>Answer</h3>

          <p>{answer}</p>
        </>
      )}
    </div>
  );
}