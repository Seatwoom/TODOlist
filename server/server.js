require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("reflect-metadata");
const { createConnection } = require("typeorm");
const { User } = require("./entity/User.js");
const APICatRoutes = require("./controllers/APICatController");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/external-cats", APICatRoutes);

const registerRoutes = require("./controllers/registerController");
const loginRoutes = require("./controllers/loginController");
const taskRoutes = require("./controllers/taskController");
const catRoutes = require("./controllers/catController");

const ormConfig = require("./ormconfig.json");
const env = process.env.NODE_ENV || "development";
const connectionOptions = ormConfig[env];

createConnection(connectionOptions)
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
