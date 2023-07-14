const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");

class Comment extends Model {}

Comment.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "userId",
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Post",
        key: "postId",
      },
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "Comment",
  }
);

module.exports = Comment;
