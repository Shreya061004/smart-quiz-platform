require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ PostgreSQL connection (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ GET QUIZ QUESTIONS (MAIN FIX)
app.get("/api/quiz/:subject/:level", async (req, res) => {
  try {
    const { subject, level } = req.params;

    console.log("PARAMS:", subject, level);

    // ⚠️ TEMP FIX: ignoring subject/level because DB has null values
    const result = await pool.query(
      "SELECT * FROM questions WHERE quiz_id = $1 LIMIT 10",
      [5] // change quiz_id if needed
    );

    console.log("DATA:", result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ LOGIN (BASIC - for your existing login)
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // ⚠️ Replace with real users table if you have one
    if (email && password) {
      return res.json({
        token: "dummy-token",
        user: { email }
      });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login error" });
  }
});

// ✅ START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});