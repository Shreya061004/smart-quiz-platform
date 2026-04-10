import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function QuizPage() {
  const { subject, level } = useParams();
  const navigate = useNavigate();

  // ✅ STATES (ALL AT TOP - IMPORTANT FOR HOOKS)
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 min

  // ✅ FETCH QUESTIONS
  useEffect(() => {
    fetch(`http://localhost:5000/api/quiz/${subject}/${level}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data);
        setQuestions(data || []);
      })
      .catch((err) => console.error(err));
  }, [subject, level]);

  // ✅ TIMER (ALWAYS TOP LEVEL HOOK)
  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft <= 0) {
      alert("⏰ Time's up!");
      navigate("/result", { state: { questions, answers } });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, questions, navigate, answers]);

  // ✅ RESTORE SELECTED ANSWER
  useEffect(() => {
    if (answers[currentIndex] !== undefined) {
      setSelected(answers[currentIndex]);
    } else {
      setSelected(null);
    }
  }, [currentIndex, answers]);

  // 🧠 FORMAT TIME
  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ✅ LOADING SAFE CHECK (VERY IMPORTANT)
  if (!questions.length) {
    return <h2 style={{ textAlign: "center" }}>⏳ Loading Questions...</h2>;
  }

  const currentQuestion = questions[currentIndex];

  // ✅ EXTRA SAFETY
  if (!currentQuestion) {
    return <h2 style={{ textAlign: "center" }}>⏳ Loading Question...</h2>;
  }

  const options = [
    currentQuestion.option1,
    currentQuestion.option2,
    currentQuestion.option3,
    currentQuestion.option4,
  ];

  // ▶ NEXT
  const handleNext = () => {
    if (selected === null) {
      alert("Please select an answer!");
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentIndex]: selected,
    };

    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result", {
        state: { questions, answers: updatedAnswers },
      });
    }
  };

  // ◀ PREVIOUS
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2>Quiz ({level})</h2>

          <div
            style={{
              ...styles.timer,
              color: timeLeft < 60 ? "red" : "#22c55e",
              borderColor: timeLeft < 60 ? "red" : "#22c55e",
            }}
          >
            ⏳ {formatTime(timeLeft)}
          </div>
        </div>

        <p style={styles.progress}>
          Question {currentIndex + 1} / {questions.length}
        </p>

        <h3>{currentQuestion.question}</h3>

        {/* OPTIONS */}
        {options.map((opt, index) => (
          <div
            key={index}
            style={{
              ...styles.option,
              background:
                selected === index
                  ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                  : "#1e293b",
              color: selected === index ? "white" : "#cbd5e1",
            }}
            onClick={() => setSelected(index)}
          >
            {opt}
          </div>
        ))}

        {/* BUTTONS */}
        <div style={styles.buttons}>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={styles.prev}
          >
            ⬅ Previous
          </button>

          <button onClick={handleNext} style={styles.next}>
            {currentIndex === questions.length - 1
              ? "Submit 🚀"
              : "Next ➡"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 💎 PREMIUM UI
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
  },

  card: {
    width: "450px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    color: "white",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timer: {
    padding: "6px 12px",
    borderRadius: "10px",
    border: "2px solid #22c55e",
    fontWeight: "bold",
  },

  progress: {
    marginTop: "10px",
    opacity: 0.7,
  },

  option: {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "0.3s",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  prev: {
    padding: "10px",
    borderRadius: "8px",
    background: "#475569",
    color: "white",
    border: "none",
  },

  next: {
    padding: "10px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
  },
};

export default QuizPage;