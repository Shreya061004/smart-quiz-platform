import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Quizzes</h2>

      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          onClick={() => navigate(`/quiz/${quiz.id}`)} // 🔥 CONNECTION
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
        </div>
      ))}
    </div>
  );
}

export default QuizList;