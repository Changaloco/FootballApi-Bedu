const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getMatches,
  getMatch,
  createMatch,
  editMatches,
  deleteMatch,
} = require("../controllers/matches");

router.get("/", getMatches);
router.get("/:id", getMatch);
router.post("/", createMatch);
router.patch("/:id", editMatches);
router.delete("/:id", deleteMatch);

module.exports = router;
