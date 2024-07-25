const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../entity/User.js");
const secretKey = process.env.JWT_SECRET;

module.exports = (app, userRepository) => {
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    try {
      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Incorrect password" });
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
};
