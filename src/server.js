require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "123",
  port: 5432,
});

app.use(cors());
app.use(express.json());

const secretKey = process.env.JWT_SECRET;
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});
app.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT todos FROM users WHERE id = $1", [
      req.user.userId,
    ]);
    res.json(result.rows[0].todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/tasks", authenticateToken, async (req, res) => {
  const { todos } = req.body;

  try {
    await pool.query("UPDATE users SET todos = $1 WHERE id = $2", [
      JSON.stringify(todos),
      req.user.userId,
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});
app.get("/cats", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT cats FROM users WHERE id = $1", [
      req.user.userId,
    ]);
    const cats = result.rows[0]?.cats || [];
    res.json(cats);
  } catch (error) {
    console.error("Error fetching cats:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/cats", authenticateToken, async (req, res) => {
  const { cats } = req.body;

  try {
    await pool.query("UPDATE users SET cats = $1 WHERE id = $2", [
      JSON.stringify(cats),
      req.user.userId,
    ]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log("Server running on port 5000");
});
