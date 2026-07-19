"use client";

import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
  "https://ai-ecourse-backend.onrender.com/history",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h2>📜 Learning History</h2>

      {history.length === 0 ? (
        <p>No uploaded courses yet.</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{item.course_title}</h3>

            <p>📄 {item.file_name}</p>

            <p>📈 Progress: {item.progress}%</p>

            <p>📝 Quiz Score: {item.quiz_score}</p>

            <p>
              {item.completed
                ? "✅ Completed"
                : "📖 In Progress"}
            </p>

            <p>
              Uploaded:
              {" "}
              {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}