"use client";

import { useState } from "react";

export default function Modules({
  result,
  historyId,
  completedModules,
  setCompletedModules,
}) {
  const [openModule, setOpenModule] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Safe checks
  if (!result || !result.course) {
    return (
      <div className="card">
        <h2>📚 Modules</h2>
        <p>No course generated yet.</p>
      </div>
    );
  }

  const modules = result.course.modules || [];

  if (modules.length === 0) {
    return (
      <div className="card">
        <h2>📚 Modules</h2>
        <p>No modules were generated.</p>
      </div>
    );
  }

  const totalModules = modules.length;
  const completed = completedModules.length;

  const percentage =
    totalModules > 0
      ? Math.round((completed / totalModules) * 100)
      : 0;

  const completeModule = async (index) => {
    if (completedModules.includes(index)) return;

    const updatedModules = [...completedModules, index];
    setCompletedModules(updatedModules);

    const updatedPercentage = Math.round(
      (updatedModules.length / totalModules) * 100
    );

    try {
      const token = localStorage.getItem("token");

      await fetch(
  `https://ai-ecourse-backend.onrender.com/history/${historyId}?progress=${updatedPercentage}&quiz_score=0&completed=${updatedPercentage === 100}`,
  {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredModules = modules.filter((module) => {
    const search = searchTerm.toLowerCase();

    return (
      module.title?.toLowerCase().includes(search) ||
      module.summary?.toLowerCase().includes(search) ||
      module.content?.toLowerCase().includes(search) ||
      module.key_points?.some((point) =>
        point.toLowerCase().includes(search)
      )
    );
  });

  return (
    <div className="card">
      <h2>📚 Course Modules</h2>

      <input
        type="text"
        placeholder="Search modules..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <br />
      <br />

      <h3>
        Progress: {completed}/{totalModules} ({percentage}%)
      </h3>

      {filteredModules.map((module, index) => (
        <div key={index} className="module-card">

          <h2>{module.title}</h2>

          <p>{module.summary}</p>

          <button
            onClick={() =>
              setOpenModule(openModule === index ? null : index)
            }
          >
            {openModule === index
              ? "Hide Lesson"
              : "View Lesson"}
          </button>

          {openModule === index && (
            <>
              <p style={{ whiteSpace: "pre-wrap" }}>
                {module.content}
              </p>

              <ul>
                {module.key_points?.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </>
          )}

          <button
            onClick={() => completeModule(index)}
            disabled={completedModules.includes(index)}
          >
            {completedModules.includes(index)
              ? "Completed"
              : "Mark as Completed"}
          </button>

        </div>
      ))}
    </div>
  );
}