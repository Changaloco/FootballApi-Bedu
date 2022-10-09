const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
//Encriptar contraseña
Usuario.createPassword = function (password) {
  salt = crypto.randomBytes(16).toString("hex"); // generando una "salt" random para cada usuario
  hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la salt
  return { salt: salt, hash: hash };
};
//Desencriptar contrasena
Usuario.validatePassword = function (password, user_salt, user_hash) {
  const hash = crypto
    .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
    .toString("hex");
  return user_hash === hash;
};
//generar Token de JWT
Usuario.generateJWT = function (user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      type: user.type,
      exp: parseInt(exp.getTime() / 1000),
    },
    jwtSecret
  );
};

module.exports = Usuario;
