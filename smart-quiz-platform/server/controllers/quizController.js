const pool = require("../config/db"); // ✅ ADD THIS

exports.getQuizQuestions = async (req, res) => {
  const { id, level } = req.params;

  console.log("PARAMS:", id, level);

  try {
    const result = await pool.query(
      "SELECT * FROM questions WHERE quiz_id = $1 AND level = $2 ORDER BY id",
      [parseInt(id), level.toLowerCase()]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};