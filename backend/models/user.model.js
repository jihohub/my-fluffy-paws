const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");
const Post = require("./post.model");
const Comment = require("./comment.model");

class User extends Model {}

User.init(
  {
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
    userImage: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    timestamps: false,
  }
);

User.hasMany(Post, { foreignKey: "userId" });
User.hasMany(Comment, { foreignKey: "userId" });

module.exports = User;
