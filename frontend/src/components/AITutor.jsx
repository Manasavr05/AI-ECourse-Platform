"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AITutor() {
  const router = useRouter();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);
    setAnswer("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        router.push("/login");
        return;
      }

      const res = await fetch("https://ai-ecourse-backend.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          question,
        }),
      });

      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Session expired. Please login again.");
        router.push("/login");
        return;
      }

      const data = await res.json();

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer("Error connecting to AI Tutor.");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
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