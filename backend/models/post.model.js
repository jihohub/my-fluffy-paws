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
    content: {
      type: DataTypes.STRING,
    },
    commentCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      get() {
        return this.getDataValue("commentCount");
      },
    },
  },
  {
    sequelize: db,
    modelName: "Post",
  }
);

Post.addHook("afterFind", (result) => {
  if (Array.isArray(result)) {
    result.forEach((post) => {
      post.commentCount = parseInt(post.commentCount, 10);
    });
  } else {
    result.commentCount = parseInt(result.commentCount, 10);
  }
});

Post.addHook("afterCreate", async (post) => {
  const count = await Comment.count({
    where: { postId: post.postId },
  });
  await post.update({ commentCount: count });
});

Post.hasMany(Comment, { foreignKey: "postId" });
Post.belongsTo(User, { foreignKey: "userId" });

module.exports = Post;
