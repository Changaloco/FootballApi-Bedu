const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getTeam,
  getTeams,
  createTeam,
  editTeam,
  deleteTeam,
} = require("../controllers/teams");

router.get("/", getTeams);
router.get("/:id", getTeam);
router.post("/", createTeam);
router.patch("/:id", editTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
