const { getRepository } = require('typeorm');
const { Cat } = require('../entity/Cat');
const { User } = require('../entity/User');
const authenticateToken = require('../middleware/authenticateToken');

module.exports = (app) => {
  const userRepository = getRepository(User);

  app.get('/api/cats', authenticateToken, async (req, res) => {
    try {
      console.log('Fetching cats for user:', req.user.userId);
      const userWithCats = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.catsEntity', 'cat')
        .where('user.id = :id', { id: req.user.userId })
        .getOne();

      if (!userWithCats) {
        console.log('User not found or no cats available');
        res.status(404).json({ error: 'User not found or no cats available' });
        return;
      }

      res.json(userWithCats?.catsEntity || []);
    } catch (error) {
      console.error('Error fetching cats:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
  app.post('/api/cats', authenticateToken, async (req, res) => {
    const { cats } = req.body;

    try {
      const user = await userRepository.findOne({
        where: { id: req.user.userId },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const catRepository = getRepository(Cat);

      await catRepository.delete({ user: { id: user.id } });

      const newCats = cats.slice(0, 10).map((cat) =>
        catRepository.create({
          url: cat.url,
          breed: cat.breed,
          user: { id: user.id },
        })
      );

      await catRepository.save(newCats);

      res.json(newCats);
    } catch (error) {
      console.error('Error saving cats:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
};
