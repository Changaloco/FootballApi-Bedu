const Usuario = require("../models/Usuario");
const {Op} = require('sequelize');

async function signUp(req, res) {
  const body = req.body;
  try {
    const { salt, hash } = Usuario.createPassword(body.password);
    const usuario = await Usuario.create({
      name: body.name,
      surname: body.surname,
      email: body.email,
      username: body.username,
      type: body.type,
      salt: salt,
      hash: hash,
    });
    delete usuario.dataValues.salt;
    delete usuario.dataValues.hash;
    res.status(201).json(usuario);
  } catch (err) {
    if (
      ["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(
        err.name
      )
    ) {
      return res.status(400).json({
        error: err.errors.map((e) => e.message),
      });
    } else {
      throw err;
    }
  }
}

async function logIn(req, res) {
  const body = req.body;
  const user = await Usuario.findOne({
    where: {
      [Op.or]: [
        { username: body.username },
        { email: body.username },
      ],
    },
  });
  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  if (Usuario.validatePassword(body["password"], user.salt, user.hash)) {
    return res.status(200).json({
      usuario: user.username,
      email: user.email,
      token: Usuario.generateJWT(user),
    });
  } else {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }
}

module.exports = {
  signUp,
  logIn,
};
