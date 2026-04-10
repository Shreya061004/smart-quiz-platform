import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ EMAIL VALIDATION (must end with .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      setError("⚠️ Email must be valid and end with .com");
      return;
    }

    // ✅ PASSWORD VALIDATION (alphanumeric only)
    const passwordRegex = /^[a-zA-Z0-9]+$/;
    if (!passwordRegex.test(password)) {
      setError("⚠️ Password must contain only letters and numbers");
      return;
    }

    // ✅ PASSWORD LENGTH
    if (password.length < 6) {
      setError("⚠️ Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);

        const name = email.split("@")[0];
        const formattedName =
          name.charAt(0).toUpperCase() + name.slice(1);

        localStorage.setItem("userName", formattedName);
        localStorage.setItem("userEmail", email);

        navigate("/dashboard");
      } else {
        setError(data.message || "❌ Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      setError("🚫 Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* 🔥 BACKGROUND GLOW */}
      <div style={styles.bg}></div>

      <div style={styles.card}>

        {/* 🎓 BHARATI VIDYAPEETH LOGO */}
        <img
          src="https://bharatividyapeethonline.com/wp-content/uploads/2022/11/University%20Logo.png"
          alt="Bharati Vidyapeeth Logo"
          style={styles.logo}
        />

        <h1 style={styles.title}>QuizNova 🚀</h1>
        <p style={styles.subtitle}>Welcome back! Let's test your skills</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button}>
            {loading ? "⏳ Logging in..." : "🚀 Login"}
          </button>
        </form>

        <p style={styles.footer}>
          New here?{" "}
          <span onClick={() => navigate("/signup")} style={styles.link}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

// 💎 STYLES
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    overflow: "hidden",
    position: "relative"
  },

  bg: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    top: "-100px",
    left: "-100px"
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "350px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
    color: "white"
  },

  // 🎓 LOGO STYLE
  logo: {
    width: "80px",
    marginBottom: "10px"
  },

  title: {
    fontSize: "28px",
    marginBottom: "5px"
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.7,
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white"
  },

  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    color: "#ff6b6b",
    fontSize: "13px"
  },

  footer: {
    marginTop: "15px",
    fontSize: "13px"
  },

  link: {
    color: "#a78bfa",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default Login;