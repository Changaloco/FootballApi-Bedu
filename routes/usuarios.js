const router = require("express").Router();

const { signUp, logIn } = require("../controllers/usuarios");

//registro del usuario dentro de la base de datos
router.post("/signUp", signUp);
//inicio de sesion del usuario
router.post("/signIn", logIn);

module.exports = router;
