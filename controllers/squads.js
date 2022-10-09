const Squad = require("../models/Squad");

async function getSquads(req, res) {
  try {
    const squads = await Squad.findAll();
    return res.status(200).json({
      squads,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: { err },
    });
  }
}

async function getSquad(req, res) {
  const idSquad = req.params.id;
  try {
    const squad = await Squad.findByPk(idSquad);
    if (!squad) {
      return res.status(404).json({
        message: "Squad not found",
      });
    }
    return res.status(200).json({
      squad,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: { err },
    });
  }
}

async function createSquad(req, res) {
  const { position, number, id_team, id_player, id_tournament } = req.body;
  try {
    const squad = await Squad.create({
      position,
      number,
      id_team,
      id_player,
      id_tournament,
    });
    return res.status(200).json({ squad });
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

async function editSquad(req, res) {
  const idSquad = req.params.id;
  const body = req.body;
  const squad = await Squad.findByPk(idSquad);
  if (!squad) {
    return res.status(404).json({
      message: "Squad not found",
    });
  }
  await squad.update(body);
  res.status(200).json({
    squad,
  });
  try {
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

async function deleteSquad(req, res) {
  const idSquad = req.params.id;
  try {
    const squad = await Squad.findByPk(idSquad);
    if (!squad) {
      return res.status(404).json({
        message: "Squad not found",
      });
    }
    await squad.destroy();
    res.status(204).json({
      message: "Squad deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      data: err,
    });
  }
}

module.exports = {
    getSquads,
    getSquad,
    createSquad,
    editSquad,
    deleteSquad,
};
