const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { createRoles } = require('./libs/initialSetup');

const app = express();
require("./db");
createRoles();

// Server config
const { config } = require("./config/index");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());
app.use(helmet());
if (config.DEV) {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes

app.listen(config.PORT, () => {
  console.log(`Listening on: http://localhost:${config.PORT}`);
});
