"use client";

export default function Modules({
  result,
  completedModules,
  setCompletedModules,
}) {
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

  return (
    <div className="card">
      <h2>📚 Course Modules</h2>

      {result.course.modules.map((module, index) => (
        <div key={index} className="module-card">
          <h3>Module {index + 1}</h3>

          <h4>{module.title}</h4>

          <p>{module.summary}</p>

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