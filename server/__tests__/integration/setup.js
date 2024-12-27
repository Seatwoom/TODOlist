const { createConnection, getConnection } = require("typeorm");
const express = require("express");
const cors = require("cors");
const { User } = require("../../entity/User");
const { Task } = require("../../entity/Task");
const { Cat } = require("../../entity/Cat");

let connection;
let app;

beforeAll(async () => {
  try {
    const ormConfig = require("../../ormconfig.json");
    const testConfig = {
      ...ormConfig.test,
      synchronize: true,
      dropSchema: true,
      entities: [User, Task, Cat],
    };

    connection = await createConnection(testConfig);

    app = express();
    app.use(cors());
    app.use(express.json());

    const registerRoutes = require("../../controllers/registerController");
    const loginRoutes = require("../../controllers/loginController");
    const taskRoutes = require("../../controllers/taskController");
    const catRoutes = require("../../controllers/catController");

    const userRepository = connection.getRepository(User);

    registerRoutes(app, userRepository);
    loginRoutes(app, userRepository);
    taskRoutes(app);
    catRoutes(app);
  } catch (error) {
    console.error("Test setup failed:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    const conn = getConnection();
    if (conn.isConnected) {
      await conn.close();
    }
  } catch (error) {
    console.error("Cleanup failed:", error);
  }
});

const clearDatabase = async () => {
  try {
    const entities = connection.entityMetadatas;
    await connection.query("TRUNCATE TABLE tasks CASCADE");
    await connection.query("TRUNCATE TABLE cats CASCADE");
    await connection.query('TRUNCATE TABLE "user" CASCADE');
  } catch (error) {
    console.error("Clear database failed:", error);
    throw error;
  }
};

beforeEach(async () => {
  await clearDatabase();
});

module.exports = {
  getApp: () => app,
  getConnection: () => connection,
};
