const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");
// const Comment = require("./comment.model");

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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

// User.hasMany(Comment, { foreignKey: "userId" });

module.exports = User;
