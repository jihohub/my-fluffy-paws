const { DataTypes, Model } = require("sequelize");
const db = require("../config/db.config");
const User = require("./user.model");

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
      allowNull: false,
      references: {
        model: User,
        key: "userId",
      },
    },
    accessToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    accessTokenExpireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    refreshTokenExpireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Token",
  }
);

Token.belongsTo(User, { foreignKey: "userId" });

module.exports = Token;
