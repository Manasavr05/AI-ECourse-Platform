"use client";

export default function CourseDetails({ result }) {
  if (!result) return null;

  return (
    <div
      className="card"
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "35px",
      }}
    >
      {/* PDF Information */}
      <h2
        style={{
          marginBottom: "25px",
          color: "#1E3A8A",
        }}
      >
        📄 Uploaded PDF Details
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            background: "#EEF4FF",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>📂 File Name</h3>
          <p>{result.filename}</p>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "250px",
            background: "#EEF4FF",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <h3>📑 Total Pages</h3>
          <p>{result.pages}</p>
        </div>
      </div>

      <hr />

      {/* Course Title */}
      <div
        style={{
          background: "#2563EB",
          color: "white",
          padding: "20px",
          borderRadius: "12px",
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <h2>📘 {result.course.title}</h2>
      </div>

      {/* Learning Objectives */}
      <div style={{ marginTop: "35px" }}>
        <h2 style={{ color: "#1E3A8A" }}>
          🎯 Learning Objectives
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {result.course.objectives.map((objective, index) => (
            <div
              key={index}
              style={{
                background: "#F8FAFC",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "18px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              }}
            >
              <h3>🎯 Objective {index + 1}</h3>
              <p>{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}