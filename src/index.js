const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { createRoles } = require('./libs/initialSetup');

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');

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
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

app.listen(config.PORT, () => {
  console.log(`Listening on: http://localhost:${config.PORT}`);
});
