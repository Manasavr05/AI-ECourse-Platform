"use client";

export default function UploadCard({
  file,
  setFile,
  uploadPDF,
  loading,
}) {
  return (
    <div
      className="card"
      style={{
        maxWidth: "800px",
        margin: "auto",
        textAlign: "center",
        padding: "35px",
      }}
    >
      <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
        📄 Upload Your PDF
      </h2>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        Upload your study material and let AI automatically generate an
        interactive course with modules, quizzes, progress tracking, and an AI
        tutor.
      </p>

      <div
        style={{
          border: "2px dashed #4F46E5",
          borderRadius: "15px",
          padding: "40px",
          background: "#f8f9ff",
          marginBottom: "25px",
        }}
      >
        <div style={{ fontSize: "60px" }}>📚</div>

        <h3>Select a PDF File</h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            marginTop: "20px",
            fontSize: "16px",
          }}
        />
      </div>

      {file && (
        <div
          style={{
            background: "#e8f5e9",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            border: "1px solid #4CAF50",
          }}
        >
          <h3>✅ File Selected</h3>

          <p>
            <strong>Name:</strong> {file.name}
          </p>

          <p>
            <strong>Size:</strong>{" "}
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      <button
        className="primary-btn"
        onClick={uploadPDF}
        disabled={loading}
        style={{
          padding: "15px 35px",
          fontSize: "18px",
          borderRadius: "10px",
        }}
      >
        {loading ? "⏳ Generating AI Course..." : "🚀 Generate AI Course"}
      </button>

      {loading && (
        <p
          style={{
            marginTop: "20px",
            color: "#4F46E5",
            fontWeight: "bold",
          }}
        >
          Please wait while AI analyzes your PDF...
        </p>
      )}
    </div>
  );
}