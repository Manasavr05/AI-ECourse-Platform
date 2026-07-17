"use client";

export default function Progress({ completed, totalModules }) {
  const percentage =
    totalModules === 0
      ? 0
      : Math.round((completed / totalModules) * 100);

  return (
    <div className="card">
      <h2>📊 Learning Progress</h2>

      <br />

      <h3>{percentage}% Completed</h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <br />

      <p>
        Completed Modules: <strong>{completed}</strong>
      </p>

      <p>
        Total Modules: <strong>{totalModules}</strong>
      </p>

      {percentage === 100 ? (
        <h3 style={{ color: "green", marginTop: "20px" }}>
          🎉 Course Completed!
        </h3>
      ) : (
        <p style={{ marginTop: "20px" }}>
          Keep learning to unlock your certificate.
        </p>
      )}
    </div>
  );
}