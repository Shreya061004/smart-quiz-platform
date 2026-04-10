import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const subjects = ["Java", "JavaScript", "Database"];

  return (
    <div style={styles.container}>
      
      {/* 🌌 BACKGROUND GLOW */}
      <div style={styles.bg}></div>

      <h1 style={styles.title}>🚀 Smart Quiz Dashboard</h1>

      <div style={styles.grid}>
        {subjects.map((subject, index) => (
          <div key={index} style={styles.card}>
            <h2>{subject}</h2>
            <p>Select difficulty level</p>

            <button
              style={styles.button}
              onClick={() => navigate(`/quiz-levels/${subject}`)}
            >
              Open Quiz →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// 💎 PREMIUM STYLES
const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    textAlign: "center",
    paddingTop: "60px",
    position: "relative",
    overflow: "hidden"
  },

  bg: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    filter: "blur(120px)",
    top: "-150px",
    left: "-150px"
  },

  title: {
    fontSize: "36px",
    marginBottom: "40px",
    letterSpacing: "1px"
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    width: "260px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    transition: "0.3s",
    cursor: "pointer"
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Dashboard;