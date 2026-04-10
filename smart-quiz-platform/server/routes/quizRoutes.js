const express = require("express");
const router = express.Router();

// import controller
const { getQuizQuestions } = require("../controllers/quizController");

// route to get quiz questions by quizId and level
router.get("/quiz/:id/:level", getQuizQuestions);

module.exports = router;