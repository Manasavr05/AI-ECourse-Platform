"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";

export default function Login() {
  const router = useRouter();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("signupEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem("signupEmail");

      // Wait for the email to be set before focusing password
      setTimeout(() => {
        passwordRef.current?.focus();
      }, 100);
    } else {
      emailRef.current?.focus();
    }
  }, []);

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem(
        "token",
        response.data.access_token
      );

      // Save User Details
      localStorage.setItem(
        "username",
        response.data.user.name
      );

      localStorage.setItem(
        "email",
        response.data.user.email
      );

      alert("Login Successful!");

      router.push("/dashboard");
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
          width: "380px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Login
        </h1>

        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              loginUser();
            }
          }}
        />

        <button
          onClick={loginUser}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}