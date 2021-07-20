require("dotenv").config();

const config = {
  DEV: process.env.NODE_ENV !== "production",
  PORT: process.env.PORT || 3000,
  SECRET: process.env.AUTH_JWT_SECRET || "secret",

  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,

  AWS_ID: process.env.AWS_ID, 
  AWS_SECRET: process.env.AWS_SECRET,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME
};

module.exports = { config };
