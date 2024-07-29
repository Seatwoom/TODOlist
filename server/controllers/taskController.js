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
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user.todos || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Database error" });
    }
  });
  app.post("/tasks", authenticateToken, async (req, res) => {
    const { todos } = req.body;

    try {
      console.log("Updating user tasks:", req.user.userId, todos);
      const updateQuery = await userRepository.update(req.user.userId, {
        todos,
      });
      console.log("Update query:", updateQuery);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error saving tasks:", error);
      res.status(500).json({ error: "Database error: " + error.message });
    }
  });
};
