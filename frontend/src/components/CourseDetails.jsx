"use client";

export default function CourseDetails({ result }) {
  if (!result) return null;

  return (
    <div className="card">
      <h2>📄 PDF Details</h2>

      <div className="details">
        <p>
          <strong>Filename:</strong> {result.filename}
        </p>

        <p>
          <strong>Pages:</strong> {result.pages}
        </p>
      </div>

      <hr style={{ margin: "25px 0" }} />

      <h2 style={{ color: "#2563eb" }}>
        📘 {result.course.title}
      </h2>

      <br />

      <h3>🎯 Learning Objectives</h3>

      <ul className="objectives">
        {result.course.objectives.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}