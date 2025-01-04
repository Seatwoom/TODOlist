const bcrypt = require('bcrypt');
const { User } = require('../entity/User.js');

module.exports = (app, userRepository) => {
  app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    try {
      const existingUser = await userRepository.findOne({
        where: { username },
      });
      if (existingUser) {
        return res.status(400).json({
          error: 'Username already taken',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User();
      user.username = username;
      user.password = hashedPassword;
      user.todos = [];
      user.cats = [];
      await userRepository.save(user);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
};
