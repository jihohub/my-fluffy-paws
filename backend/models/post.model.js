const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");
const Comment = require("./comment.model");

class Post extends Model {}

Post.init(
  {
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
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "userId",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Post",
  }
);

Post.hasMany(Comment, { foreignKey: "postId" });

module.exports = Post;
