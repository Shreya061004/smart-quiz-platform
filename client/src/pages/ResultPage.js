import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import jsPDF from "jspdf";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { questions = [], answers = {} } = location.state || {};

  const username = localStorage.getItem("userName") || "Guest";

  // ✅ SCORE CALCULATION
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.correct_answer - 1) {
      score++;
    }
  });

  // 🎉 CONFETTI
  useEffect(() => {
    if (score >= 5) {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
      });
    }
  }, [score]);

  // 📜 PREMIUM CERTIFICATE
  const downloadCertificate = () => {
    const doc = new jsPDF();

    // Background border
    doc.setDrawColor(0, 102, 204);
    doc.setLineWidth(4);
    doc.rect(10, 10, 190, 277);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.text("CERTIFICATE", 105, 50, null, null, "center");

    doc.setFontSize(18);
    doc.text("OF ACHIEVEMENT", 105, 65, null, null, "center");

    // Subtitle
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text("This is proudly presented to", 105, 90, null, null, "center");

    // Name
    doc.setFont("courier", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0, 102, 204);
    doc.text(username, 105, 110, null, null, "center");

    // Description
    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(
      "for successfully completing the Smart Quiz",
      105,
      130,
      null,
      null,
      "center"
    );

    // Score
    doc.setFontSize(16);
    doc.text(`Score: ${score}/${questions.length}`, 105, 150, null, null, "center");

    // Date
    const date = new Date().toLocaleDateString();
    doc.text(`Date: ${date}`, 105, 170, null, null, "center");

    // Footer
    doc.setFontSize(12);
    doc.text("Smart Quiz Platform", 105, 250, null, null, "center");

    doc.save("certificate.pdf");
  };

  return (
    <div style={styles.container}>
      <h1>🎯 Quiz Result</h1>

      <h3>{username}</h3>

      <h2>{score} / {questions.length}</h2>

      <h3>
        {score >= 5 ? "🎉 Great Job!" : "😢 Try Again!"}
      </h3>

      {/* CERTIFICATE */}
      {score >= 5 ? (
        <button style={styles.button} onClick={downloadCertificate}>
          📜 Download Certificate
        </button>
      ) : (
        <p style={{ color: "red" }}>
          ❌ Certificate not available (Score ≥ 5 required)
        </p>
      )}

      {/* NAV BUTTONS */}
      <div style={styles.buttons}>
        <button onClick={() => navigate("/dashboard")}>🏠 Home</button>
        <button onClick={() => navigate(-1)}>🔄 Retry</button>
      </div>

      {/* ANSWER REVIEW */}
      <div style={styles.review}>
        <h2>Answer Review</h2>

        {questions.map((q, index) => {
          const options = [q.option1, q.option2, q.option3, q.option4];

          const userAnswer =
            answers[index] !== undefined
              ? options[answers[index]]
              : "Not Answered";

          const correctAnswer = options[q.correct_answer - 1];

          return (
            <div key={index} style={styles.question}>
              <p><b>Q{index + 1}: {q.question}</b></p>

              <p style={{ color: "orange" }}>
                Your Answer: {userAnswer}
              </p>

              <p style={{ color: "green" }}>
                Correct: {correctAnswer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
  },
  button: {
    padding: "12px",
    marginTop: "10px",
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  review: {
    marginTop: "30px",
    textAlign: "left",
    maxWidth: "600px",
    marginInline: "auto",
  },
  question: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
};

export default ResultPage;