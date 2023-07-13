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
    userImage: {
      type: DataTypes.STRING,
    },
    image: {
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

module.exports = Post;
