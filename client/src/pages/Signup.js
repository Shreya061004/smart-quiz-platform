import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.message === "User created") {
      alert("Signup successful");
      navigate("/");
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #4f46e5, #9333ea)"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "15px",
        width: "350px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center" }}>Create Account ✨</h2>

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", margin: "10px 0" }}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "12px", margin: "10px 0" }}
          />

          <button style={{ width: "100%", marginTop: "10px" }}>
            Signup
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have account? <span style={{ cursor: "pointer", color: "#4f46e5" }}
          onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;