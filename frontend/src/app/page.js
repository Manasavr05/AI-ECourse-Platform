"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#2563EB,#1E3A8A)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "80px 40px",
      }}
    >
      <div style={{ maxWidth: "1100px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          🎓 AI PDF to E-Course Platform
        </h1>

        <p
          style={{
            fontSize: "22px",
            marginBottom: "40px",
            lineHeight: "1.7",
          }}
        >
          Transform any PDF into an AI-powered interactive course with
          quizzes, progress tracking, certificates, and an AI Tutor.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "60px",
          }}
        >
          <Link href="/signup">
            <button className="primary-btn">
              🚀 Get Started
            </button>
          </Link>

          <Link href="/login">
            <button
              style={{
                padding: "14px 30px",
                background: "white",
                color: "#2563EB",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🔐 Login
            </button>
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: "📄",
              title: "Upload PDF",
              desc: "Upload study material instantly.",
            },
            {
              icon: "🤖",
              title: "AI Course",
              desc: "Generate complete AI-powered courses.",
            },
            {
              icon: "📚",
              title: "Modules",
              desc: "Learn topic by topic.",
            },
            {
              icon: "📝",
              title: "Quiz",
              desc: "Test your knowledge.",
            },
            {
              icon: "📈",
              title: "Progress",
              desc: "Track your learning progress.",
            },
            {
              icon: "🏆",
              title: "Certificate",
              desc: "Download your completion certificate.",
            },
            {
              icon: "💬",
              title: "AI Tutor",
              desc: "Ask questions from your uploaded PDF.",
            },
            {
              icon: "🔒",
              title: "Secure Login",
              desc: "JWT-based authentication.",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "white",
                color: "#1E293B",
                padding: "25px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            >
              <div
                style={{
                  fontSize: "45px",
                  marginBottom: "15px",
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  marginBottom: "10px",
                  color: "#1E293B",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#64748B",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}