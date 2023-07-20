const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");
const Comment = require("./comment.model");
const User = require("./user.model")

class Post extends Model {}

Post.init(
  {
    postId: {
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
    image: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING(1500),
    },
  },
  {
    sequelize: db,
    modelName: "Post",
  }
);

Post.hasMany(Comment, { foreignKey: "postId" });
User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

module.exports = Post;
