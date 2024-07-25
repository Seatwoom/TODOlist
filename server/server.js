require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("reflect-metadata");
const { createConnection } = require("typeorm");
const { User } = require("./entity/User.js");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const registerRoutes = require("./controllers/registerController");
const loginRoutes = require("./controllers/loginController");
const taskRoutes = require("./controllers/taskController");
const catRoutes = require("./controllers/catController");

createConnection()
  .then(async (connection) => {
    const userRepository = connection.getRepository(User);

    registerRoutes(app, userRepository);
    loginRoutes(app, userRepository);
    taskRoutes(app);
    catRoutes(app);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
