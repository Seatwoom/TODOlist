const { getRepository } = require('typeorm');
const { User } = require('../entity/User.js');
const { Task } = require('../entity/Task.js');

const authenticateToken = require('../middleware/authenticateToken');

module.exports = (app) => {
  const userRepository = getRepository(User);

  app.get('/tasks', authenticateToken, async (req, res) => {
    try {
      const tasks = await userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.tasks', 'task')
        .where('user.id = :id', { id: req.user.userId })
        .getOne();

      res.json(tasks?.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
  app.post('/tasks', authenticateToken, async (req, res) => {
    const todos = req.body.tasks;

    console.log('Received todos:', todos);

    try {
      const user = await userRepository.findOne({
        where: { id: req.user.userId },
        relations: ['tasks'],
      });

      if (!user) {
        console.log('User not found:', req.user.userId);
        return res.status(404).json({ error: 'User not found' });
      }

      const taskRepository = getRepository(Task);

      await taskRepository.delete({ user: user.id });

      const tasks = todos.map((todo) =>
        taskRepository.create({
          text: todo.text,
          status: todo.status,
          user: user.id,
        })
      );

      await taskRepository.save(tasks);
      res.sendStatus(200);
    } catch (error) {
      console.error('Error saving tasks:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
};
