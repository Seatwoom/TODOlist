const { getRepository } = require("typeorm");
const { User } = require("../entity/User.js");

const authenticateToken = require("../middleware/authenticateToken");

module.exports = (app) => {
  const userRepository = getRepository(User);

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
};
