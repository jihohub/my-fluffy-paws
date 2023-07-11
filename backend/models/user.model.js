const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const User = db.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
  },
  userProfile: {
    type: DataTypes.STRING,
  },
});

module.exports = User;
