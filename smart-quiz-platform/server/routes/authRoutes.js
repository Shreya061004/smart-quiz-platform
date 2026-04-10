const express = require("express");
const router = express.Router();

// ✅ IMPORTANT (correct import)
const { signup, login } = require("../controllers/authController");

// routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;