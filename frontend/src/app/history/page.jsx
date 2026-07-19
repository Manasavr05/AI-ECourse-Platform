"use client";

import { useEffect, useState } from "react";
import API from "../../../lib/api";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const res = await API.get("/history/");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load learning history.");
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="card">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>📚 Learning History</h2>

      {history.length === 0 ? (
        <p>No learning history yet.</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 20,
              marginTop: 20,
            }}
          >
            <h3>{item.course_title}</h3>

            <p>
              <b>PDF:</b> {item.file_name}
            </p>

            <p>
              <b>Progress:</b> {item.progress}%
            </p>

            <p>
              <b>Quiz Score:</b> {item.quiz_score}
            </p>

            <p>
              <b>Status:</b>{" "}
              {item.completed ? "✅ Completed" : "📖 In Progress"}
            </p>

            <p>
              <b>Uploaded:</b>{" "}
              {new Date(item.created_at).toLocaleDateString()}
            </p>

            <button
              style={{
                marginTop: 10,
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Continue Learning
            </button>
          </div>
        ))
      )}
    </div>
  );
}