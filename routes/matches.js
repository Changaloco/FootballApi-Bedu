const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getMatches,
  getMatch,
  createMatch,
  editMatches,
  deleteMatch,
  getMatchesByTournament,
  getMatchesByTeam
} = require("../controllers/matches");

router.get("/", getMatches);
router.get("/:id", getMatch);
router.post("/", createMatch);
router.patch("/:id", editMatches);
router.delete("/:id", deleteMatch);
router.get("/tournament/:id", getMatchesByTournament);
router.get("/team/:id", getMatchesByTeam);

module.exports = router;
