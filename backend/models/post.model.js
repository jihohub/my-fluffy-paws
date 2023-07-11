const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Post = db.define("Post", {
  postId: {
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
  picture: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
});

module.exports = Post;
