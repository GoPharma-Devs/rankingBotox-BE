const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const pkg = require('../package.json');


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

// Settings
app.set('pkg', pkg);

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

// Welcome Route
app.get('/', (req, res) => {
  res.json({
    author: app.get('pkg').author,
    name: app.get('pkg').name,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

app.listen(config.PORT, () => {
  console.log(`Listening on: http://localhost:${config.PORT}`);
});
