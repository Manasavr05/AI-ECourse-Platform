"use client";

export default function UploadCard({
  file,
  setFile,
  uploadPDF,
  loading,
}) {
  return (
    <div className="card">

      <h2>📄 Upload PDF</h2>

      <p className="subtitle">
        Upload your study material and let AI create an interactive course.
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <p className="success">
          Selected: {file.name}
        </p>
      )}

      <button
        className="primary-btn"
        onClick={uploadPDF}
      >
        {loading ? "Generating Course..." : "Upload PDF"}
      </button>

    </div>
  );
}