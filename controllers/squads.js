const Squad = require("../models/Squad");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

async function getSquads(req, res) {
  try {
    const squads = await Squad.findAll();
    return res.status(200).json({
      squads,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: err.message,
    });
  }
}

async function getSquad(req, res) {
  const idSquad = req.params.id;
  try {
    const squad = await Squad.findByPk(idSquad, {
      include: [
        {
          model: Player,
          required: true,
        },
        {
          model: Team,
          required: true,
        },
        {
          model: Tournament,
          required: true,
        },
      ],
    });
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
  const { position, number, fk_team, fk_player, fk_tournament } = req.body;
  try {
    const squad = await Squad.create({
      position,
      number,
      fk_team,
      fk_player,
      fk_tournament,
    });
    return res.status(201).json({ squad });
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
//Obtiene los jugadores que se han registrado en el squad de un equipo
async function getTeamSquad(req, res) {
  const idTeam = req.params.id;
  try {
    const squad = await Squad.findAll({
      where: {
        fk_team: idTeam,
      },
      include: [
        {
          model: Player,
          required: true,
        },
      ],
    });
    if (!squad) {
      return res.status(404).json({
        message: "Squad not found",
      });
    }
    return res.status(200).json({
      squad,
    });
  } catch (err) {
    console.log("err.message", err.message);
    return res.status(404).json({
      message: "Something goes wrong",
      data: err.message,
    });
  }
}
//Obtiene los torneos en los que esta participando un equipo
async function getSquadTeamTournaments(req, res) {
  const idTeam = req.params.id;
  try {
    const squad = await Squad.findAll({
      attributes: ["id_tournament"],
      where: {
        fk_team: idTeam,
      },
      include: [
        {
          model: Tournament,
          required: true,
          attributes: [
            "tournamentName",
            "year",
            "typeTournament",
            "id_tournament",
          ],
        },
      ],
      group: ["Squad.id_tournament", "Tournament.id_tournament"],
    });
    if (!squad) {
      return res.status(404).json({
        message: "Squad not found",
      });
    }
    return res.status(200).json({
      squad,
    });
  } catch (err) {
    console.log("err.message", err.message);
    return res.status(404).json({
      message: "Something goes wrong",
      data: err.message,
    });
  }
}

module.exports = {
  getSquads,
  getSquad,
  createSquad,
  editSquad,
  deleteSquad,
  getTeamSquad,
  getSquadTeamTournaments,
};
