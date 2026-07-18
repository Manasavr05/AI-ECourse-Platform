"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name || "Learner");
  }, []);

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px 25px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#1E3A8A",
            fontSize: "28px",
          }}
        >
          👋 Welcome, {username}!
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#666",
            fontSize: "16px",
          }}
        >
          Ready to continue learning? 📚
        </p>
      </div>

      <div
        style={{
          background: "#2563EB",
          color: "white",
          padding: "12px 18px",
          borderRadius: "10px",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        AI PDF to E-Course Platform
      </div>
    </div>
  );
}