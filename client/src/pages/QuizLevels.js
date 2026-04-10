import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuizLevels() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const levels = [
    { name: "easy", color: "#22c55e" },
    { name: "medium", color: "#f59e0b" },
    { name: "hard", color: "#ef4444" }
  ];

  return (
    <div className="levels-container">
      
      {/* TITLE */}
      <h1 className="levels-title">
        {subject?.toUpperCase()} Quiz 🎯
      </h1>

      <p className="levels-subtitle">
        Choose your difficulty level
      </p>

      {/* LEVEL CARDS */}
      <div className="levels-grid">
        {levels.map((level, index) => (
          <div key={index} className="level-card">
            
            <h2 style={{ color: level.color }}>
              {level.name.toUpperCase()}
            </h2>

            <p className="level-desc">
              Test your {level.name} level skills
            </p>

            <button
              className="level-btn"
              onClick={() =>
                navigate(`/quiz/${subject}/${level.name}`)
              }
            >
              Start →
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizLevels;