import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: "#4f46e5",
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2 onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>
        SmartQuiz 🚀
      </h2>

      <button onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;