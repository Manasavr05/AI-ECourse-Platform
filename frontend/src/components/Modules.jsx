"use client";

import { useState } from "react";

export default function Modules({
  result,
  completedModules,
  setCompletedModules,
}) {
  const [openModule, setOpenModule] = useState(null);

  if (!result) {
    return (
      <div className="card">
        <h2>📚 Modules</h2>
        <p>Upload a PDF to view modules.</p>
      </div>
    );
  }

  const completeModule = (index) => {
    if (!completedModules.includes(index)) {
      setCompletedModules([...completedModules, index]);
    }
  };

  const toggleModule = (index) => {
    if (openModule === index) {
      setOpenModule(null);
    } else {
      setOpenModule(index);
    }
  };

  const totalModules = result.course.modules.length;
  const completed = completedModules.length;
  const percentage = Math.round((completed / totalModules) * 100);

  return (
    <div className="card">
      <h2>📚 Course Modules</h2>

      <h3>
        Progress: {completed}/{totalModules} ({percentage}%)
      </h3>

      <br />

      {result.course.modules.map((module, index) => (
        <div
          key={index}
          style={{
            marginBottom: "25px",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: "#2563EB" }}>
            📘 Module {index + 1}
          </h3>

          <h2>{module.title}</h2>

          <p>
            <strong>Summary</strong>
          </p>

          <p>{module.summary}</p>

          <button
            onClick={() => toggleModule(index)}
            style={{
              marginBottom: "20px",
              padding: "10px 18px",
              background: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {openModule === index
              ? "Hide Lesson"
              : "📖 View Lesson"}
          </button>

          {openModule === index && (
            <>
              <hr />

              <h3>📖 Lesson</h3>

              <div
                style={{
                  lineHeight: "1.8",
                  textAlign: "justify",
                  whiteSpace: "pre-wrap",
                  marginBottom: "20px",
                }}
              >
                {module.content}
              </div>

              {module.key_points &&
                module.key_points.length > 0 && (
                  <>
                    <h3>💡 Key Points</h3>

                    <ul>
                      {module.key_points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
            </>
          )}

          <br />

          <button
            className="primary-btn"
            onClick={() => completeModule(index)}
            disabled={completedModules.includes(index)}
          >
            {completedModules.includes(index)
              ? "✅ Completed"
              : "Mark as Completed"}
          </button>
        </div>
      ))}
    </div>
  );
}