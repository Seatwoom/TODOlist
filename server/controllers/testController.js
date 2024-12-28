const { getConnection } = require('typeorm');

module.exports = (app) => {
  app.post('/test/cleanup', async (req, res) => {
    try {
      const connection = getConnection();
      await connection.query('TRUNCATE TABLE tasks CASCADE');
      await connection.query('TRUNCATE TABLE cats CASCADE');
      await connection.query('TRUNCATE TABLE "user" CASCADE');
      res.sendStatus(200);
    } catch (error) {
      console.error('Test cleanup failed:', error);
      res.sendStatus(500);
    }
  });
};
