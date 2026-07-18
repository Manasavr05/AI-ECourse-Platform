"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../../lib/api";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signupUser = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      // Save email for login page
      localStorage.setItem("signupEmail", email);

      alert(response.data.message);

      router.push("/login");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert("Unable to connect to the backend.");
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Signup
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={signupUser}
          style={{
            width: "100%",
            padding: "12px",
            background: "#16A34A",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
}