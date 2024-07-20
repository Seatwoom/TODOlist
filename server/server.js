require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("reflect-metadata");
const { createConnection } = require("typeorm");
const { User } = require("./entity/User.js");

const app = express();
const port = 5000;

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

createConnection()
  .then(async (connection) => {
    const userRepository = connection.getRepository(User);

    app.post("/register", async (req, res) => {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const user = new User();
        user.username = username;
        user.password = hashedPassword;
        user.todos = [];
        user.cats = [];
        await userRepository.save(user);
        res.status(201).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
      }
    });

    app.post("/login", async (req, res) => {
      const { username, password } = req.body;

      try {
        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
          return res.status(400).json({ error: "Invalid credentials" });
        }

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
        const user = await userRepository.findOne({
          where: { id: req.user.userId },
        });
        res.json(user.todos);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
      }
    });

    app.post("/tasks", authenticateToken, async (req, res) => {
      const { todos } = req.body;

      try {
        await userRepository.update(req.user.userId, { todos });
        res.sendStatus(200);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
      }
    });

    app.get("/cats", authenticateToken, async (req, res) => {
      try {
        const user = await userRepository.findOne({
          where: { id: req.user.userId },
        });
        res.json(user.cats);
      } catch (error) {
        console.error("Error fetching cats:", error);
        res.status(500).json({ error: "Database error" });
      }
    });

    app.post("/cats", authenticateToken, async (req, res) => {
      const { cats } = req.body;

      try {
        await userRepository.update(req.user.userId, { cats });
        res.sendStatus(200);
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
