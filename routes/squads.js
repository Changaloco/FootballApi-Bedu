const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getSquads,
  getSquad,
  createSquad,
  editSquad,
  deleteSquad,
} = require("../controllers/squads");

router.get("/", getSquads);
router.get("/:id", getSquad);
router.post("/", createSquad);
router.patch("/:id", editSquad);
router.delete("/:id", deleteSquad);

module.exports = router;
