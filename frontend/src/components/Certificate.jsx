"use client";

import { jsPDF } from "jspdf";

export default function Certificate({
  completed,
  totalModules,
  courseTitle,
}) {
  const completedAll =
    totalModules > 0 && completed === totalModules;

  const downloadCertificate = () => {
    const doc = new jsPDF();

    doc.setFontSize(24);
    doc.text("Certificate of Completion", 40, 30);

    doc.setFontSize(16);
    doc.text(
      "This certifies that the learner has successfully completed",
      20,
      60
    );

    doc.setFontSize(20);
    doc.text(courseTitle, 20, 80);

    doc.setFontSize(14);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      110
    );

    doc.text(
      "AI PDF to E-Course Platform",
      20,
      125
    );

    doc.save("certificate.pdf");
  };

  return (
    <div className="card">
      <h2>🏆 Certificate</h2>

      <br />

      {completedAll ? (
        <>
          <h3 style={{ color: "green" }}>
            🎉 Congratulations!
          </h3>

          <p style={{ marginTop: "15px" }}>
            You have completed the course.
          </p>

          <br />

          <button
            className="primary-btn"
            onClick={downloadCertificate}
          >
            Download Certificate
          </button>
        </>
      ) : (
        <>
          <p>
            Complete all modules to unlock your certificate.
          </p>

          <br />

          <h3>
            {completed} / {totalModules} Modules Completed
          </h3>
        </>
      )}
    </div>
  );
}