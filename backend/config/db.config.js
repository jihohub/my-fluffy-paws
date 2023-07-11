const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

module.exports = sequelize;
