import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import QuizLevels from "./pages/QuizLevels";

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* QUIZ FLOW */}
        <Route path="/quiz-levels/:subject" element={<QuizLevels />} />
        <Route path="/quiz/:subject/:level" element={<QuizPage />} />

        {/* RESULT */}
        <Route path="/result" element={<ResultPage />} />

      </Routes>
    </Router>
  );
}

export default App;