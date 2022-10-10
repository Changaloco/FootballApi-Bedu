const router = require("express").Router();

const players = require("./players");
const tournaments = require("./tournaments");
const usuarios = require("./usuarios");
const teams = require("./teams");
const squads = require("./squads");
const matches = require("./matches");

router.get("/", (req, res) => {
  res.json({ info: "Welcome to football API! for more information visit: https://github.com/olvera93/FootballApi-Bedu" });
});

router.use("/players", players);
router.use("/tournaments", tournaments);
router.use("/usuarios", usuarios);
router.use("/teams", teams);
router.use("/squads", squads);
router.use("/matches", matches);

module.exports = router;
