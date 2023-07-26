const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");

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
  }
);

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
    commentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    modelName: "Post",
  }
);

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
    text: {
      type: DataTypes.STRING(300),
    },
    likeCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize: db,
    modelName: "Comment",
  }
);

class Token extends Model {}

Token.init(
  {
    tokenId: {
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
    accessToken: {
      type: DataTypes.STRING(255),
    },
    refreshToken: {
      type: DataTypes.STRING(255),
    },
    accessTokenExpireAt: {
      type: DataTypes.DATE,
    },
    refreshTokenExpireAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    modelName: "Token",
  }
);

class PostLike extends Model { }

PostLike.init(
  {
    likeId: {
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
  },
  {
    sequelize: db,
    modelName: "PostLike",
    tableName: "post_likes",
  }
);

class CommentLike extends Model {}

CommentLike.init(
  {
    likeId: {
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
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Comment",
        key: "commentId",
      },
    },
  },
  {
    sequelize: db,
    modelName: "CommentLike",
    tableName: "comment_likes",
  }
);

class Follower extends Model {}

Follower.init(
  {
    followerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "User",
        key: "userId",
      },
    },
    followingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "User",
        key: "userId",
      },
    },
  },
  {
    sequelize: db,
    modelName: "Follower",
    timestamps: false,
  }
);

class Room extends Model {}

Room.init(
  {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomName: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize: db,
    modelName: "Room",
  }
);

class Message extends Model {}

Message.init(
  {
    messageId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: "roomId",
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: db,
    modelName: "Message",
  }
);

class RoomUser extends Model {}

RoomUser.init(
  {
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: Room,
        key: "roomId",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
  },
  {
    sequelize: db,
    modelName: "RoomUser",
    timestamps: false,
  }
);

User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { as: "comments", foreignKey: "postId" });
Comment.hasMany(Post, { foreignKey: "postId" });

User.hasOne(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

User.hasMany(PostLike, { foreignKey: "userId" });
PostLike.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(PostLike, { as: "likedUser", foreignKey: "postId" });
PostLike.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(CommentLike, { foreignKey: "userId" });
CommentLike.belongsTo(User, { foreignKey: "userId" });

Comment.hasMany(CommentLike, { as: "likedUser", foreignKey: "commentId" });
CommentLike.belongsTo(Comment, { foreignKey: "commentId" });

User.hasMany(Follower, {
  foreignKey: "followerId",
  sourceKey: "userId",
  as: "followers",
});
Follower.belongsTo(User, {
  foreignKey: "followerId",
  targetKey: "userId",
});

User.hasMany(Follower, {
  foreignKey: "followingId",
  sourceKey: "userId",
  as: "followings",
});
Follower.belongsTo(User, {
  foreignKey: "followingId",
  targetKey: "userId",
});

Room.hasMany(Message, {
  foreignKey: "roomId",
  as: "messages",
});
Message.belongsTo(Room, {
  foreignKey: "roomId",
});

Room.belongsToMany(User, { through: RoomUser, as: "participants" });
User.belongsToMany(Room, { through: RoomUser, as: "participatedRooms" });

Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });

module.exports = {
  User,
  Post,
  Comment,
  Token,
  PostLike,
  CommentLike,
  Follower,
  Room,
  Message,
  RoomUser,
};
