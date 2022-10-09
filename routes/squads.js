const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getSquads,
  getSquad,
  createSquad,
  editSquad,
  deleteSquad,
  getTeamSquad,
  getSquadTeamTournaments,
} = require("../controllers/squads");

router.get("/", getSquads);
router.get("/:id", getSquad);
router.post("/", createSquad);
router.patch("/:id", editSquad);
router.delete("/:id", deleteSquad);
router.get("/teams/:id", getTeamSquad);
router.get("/teams/tournaments/:id", getSquadTeamTournaments);
module.exports = router;
