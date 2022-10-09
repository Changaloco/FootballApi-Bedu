const router = require("express").Router();

const { signUp, logIn } = require("../controllers/usuarios");

router.post("/signUp", signUp);
router.post("/signIn", logIn);

module.exports = router;
