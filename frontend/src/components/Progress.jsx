"use client";

export default function Progress({ completed, totalModules }) {
  const percentage =
    totalModules === 0
      ? 0
      : Math.round((completed / totalModules) * 100);

  let status = "";

  if (percentage === 100) {
    status = "🎉 Excellent! You completed the course.";
  } else if (percentage >= 75) {
    status = "🔥 Almost there!";
  } else if (percentage >= 50) {
    status = "💪 Keep going!";
  } else if (percentage > 0) {
    status = "📚 Nice start!";
  } else {
    status = "🚀 Begin your learning journey!";
  }

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

      <br />

      <h3>{status}</h3>

      {percentage === 100 ? (
        <h3 style={{ color: "green", marginTop: "20px" }}>
          🏆 Certificate Unlocked!
        </h3>
      ) : (
        <p style={{ marginTop: "20px" }}>
          Complete all modules to unlock your certificate.
        </p>
      )}
    </div>
  );
}