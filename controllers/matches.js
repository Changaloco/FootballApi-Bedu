const {Op} = require('sequelize');
const Match = require("../models/Match");
const Team = require("../models/Team");
const Tournament = require("../models/Tournament");

async function getMatches(req, res) {
  try {
    const matches = await Match.findAll({
      include: [
        {
          model: Tournament,
          required: true,
        },
        {
          model: Team,
          as: "home",
        },
        {
          model: Team,
          as: "away",
        },
      ],
    });
    return res.status(200).json({
      matches,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: err.message,
    });
  }
}
async function getMatch(req, res) {
  const idMatch = req.params.id;
  try {
    const match = await Match.findByPk(idMatch, {
      include: [
        {
          model: Tournament,
          required: true,
        },
        {
          model: Team,
          as: "home",
        },
        {
          model: Team,
          as: "away",
        },
      ],
    });
    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }
    return res.status(200).json({
      match,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: { err },
    });
  }
}
async function createMatch(req, res) {
  const body = req.body;
  try {
    const match = await Match.create(body);
    return res.status(200).json({ match });
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
async function editMatches(req, res) {
  const idMatch = req.params.id;
  const body = req.body;
  try {
    const match = await Match.findByPk(idMatch);
    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }
    const updatedMatch = await match.update(body);
    return res.status(200).json({ updatedMatch });
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
async function deleteMatch(req, res) {
  const idMatch = req.params.id;
  try {
    const match = await Match.findByPk(idMatch);
    if (!match) {
      return res.status(404).json({
        message: "Match not found",
      });
    }
    await match.destroy();
    return res.status(200).json({ message: "Match deleted" });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      data: err,
    });
  }
}
//Obtiene todos los partidos que se realizaron dentro de un torneo
async function getMatchesByTournament(req, res) {
  const idTournament = req.params.id;
  try {
    const matches = await Match.findAll({
      where: {
        id_tournament: idTournament,
      },
      include: [
        {
          model: Tournament,
          required: true,
        },
        {
          model: Team,
          as: "home",
        },
        {
          model: Team,
          as: "away",
        },
      ],
    });
    return res.status(200).json({
      matches,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: err.message,
    });
  }
}

async function getMatchesByTeam(req,res){
  const idTeam = req.params.id;
  try {
    const matches = await Match.findAll({
      where: {
        [Op.or]: [
          { id_home: idTeam },
          { id_away: idTeam },
        ],
      },
      include: [
        {
          model: Tournament,
          required: true,
        },
        {
          model: Team,
          as: "home",
        },
        {
          model: Team,
          as: "away",
        },
      ],
    });
    return res.status(200).json({
      matches,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: err.message,
    });
  }
}

module.exports = {
  getMatches,
  getMatch,
  createMatch,
  editMatches,
  deleteMatch,
  getMatchesByTournament,
  getMatchesByTeam
};
