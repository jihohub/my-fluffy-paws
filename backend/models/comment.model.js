const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Comment = db.define("Comment", {
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
  },
  userProfile: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Comment;
