const { getRepository } = require("typeorm");
const { User } = require("../entity/User.js");

const authenticateToken = require("../middleware/authenticateToken");

module.exports = (app) => {
  const userRepository = getRepository(User);

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
};
