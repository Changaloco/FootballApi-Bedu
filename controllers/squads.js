const Squad = require("../models/Squad");
const Player = require("../models/player");
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

async function getSquads(req, res) {
  const options = {
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
  }
  const {limit, offset} = req.query;
  if(limit && offset){
    options.limit = limit;
    options.offset = offset;
  }
  try {
    const squads = await Squad.findAll(options);
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
      data: err.message,
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
  const {position, number, id_team, id_player, id_tournament} = req.body;
  const squad = await Squad.findByPk(idSquad);
  if (!squad) {
    return res.status(404).json({
      message: "Squad not found",
    });
  }
  await squad.update({
    position,
    number,
    id_team,
    id_player,
    id_tournament
  });
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
    res.status(200).json({
      message: "Squad deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      data: err.message,
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
      attributes: ["id_squad", "fk_team"],
      where: {
        fk_team: idTeam,
      },
      include: [
        {
          model: Tournament,
          required: true,
          attributes: [
            "id_tournament",
            "tournamentName",
            "year",
            "typeTournament"
            
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
