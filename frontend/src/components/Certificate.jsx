"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Certificate({
  completed,
  totalModules,
  courseTitle,
}) {
  const completedAll =
    totalModules > 0 && completed === totalModules;

  const [learnerName, setLearnerName] = useState("");

  const downloadCertificate = () => {
    if (!learnerName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Border
    doc.setDrawColor(0);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("Certificate of Completion", 148, 35, {
      align: "center",
    });

    // Subtitle
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(
      "This certificate is proudly presented to",
      148,
      60,
      { align: "center" }
    );

    // Learner Name
    doc.setFont("times", "bold");
    doc.setFontSize(26);
    doc.setTextColor(30, 64, 175);
    doc.text(learnerName, 148, 82, {
      align: "center",
    });
    doc.setTextColor(0, 0, 0);

    // Body
    doc.setFont("times", "normal");
    doc.setFontSize(16);
    doc.text(
      "For successfully completing the AI-generated course",
      148,
      100,
      { align: "center" }
    );

    // Course Name
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text(courseTitle, 148, 120, {
      align: "center",
    });

    // Date
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      170
    );

    // Signature
    doc.line(200, 165, 265, 165);
    doc.text("AI PDF to E-Course Platform", 205, 175);

    doc.save("AI_Course_Certificate.pdf");
  };

  return (
    <div className="card">
      <h2>🏆 Certificate</h2>

      <br />

      {completedAll ? (
        <>
          <h3
            style={{
              color: "green",
              textAlign: "center",
            }}
          >
            🎉 Congratulations!
          </h3>

          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            You have successfully completed the course.
          </p>

          <br />

          <div
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Enter your full name"
              value={learnerName}
              onChange={(e) =>
                setLearnerName(e.target.value)
              }
              style={{
                width: "320px",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "center",
            }}
          >
            <button
              className="primary-btn"
              onClick={downloadCertificate}
            >
              📥 Download Certificate
            </button>
          </div>
        </>
      ) : (
        <>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Complete all modules to unlock your certificate.
          </p>

          <br />

          <h3
            style={{
              textAlign: "center",
            }}
          >
            {completed} / {totalModules} Modules Completed
          </h3>

          <br />

          <div
            style={{
              width: "100%",
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${
                  totalModules === 0
                    ? 0
                    : (completed / totalModules) * 100
                }%`,
                height: "20px",
                background: "#4CAF50",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}