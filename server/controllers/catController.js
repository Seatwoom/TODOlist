const { getRepository } = require("typeorm");
const { User } = require("../entity/User");
const authenticateToken = require("../middleware/authenticateToken");

module.exports = (app) => {
  const userRepository = getRepository(User);

  app.get("/api/cats", authenticateToken, async (req, res) => {
    try {
      const user = await userRepository.findOne({
        where: { id: req.user.userId },
      });
      if (user) {
        res.json(user.cats || []);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error fetching cats:", error);
      res.status(500).json({ error: "Database error" });
    }
  });

  app.post("/api/cats", authenticateToken, async (req, res) => {
    const { cats } = req.body;
    try {
      const user = await userRepository.findOne({
        where: { id: req.user.userId },
      });
      if (user) {
        user.cats = cats;
        await userRepository.save(user);
        res.sendStatus(200);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Database error" });
    }
  });
};
