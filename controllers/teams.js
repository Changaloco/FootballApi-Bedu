const Team = require("../models/Team");

async function getTeams(req, res) {
  try {
    const teams = await Team.findAll();
    return res.status(200).json({
      teams,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: { err },
    });
  }
}

async function getTeam(req, res) {
  const idTeam = req.params.id;
  try {
    const team = await Team.findByPk(idTeam);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }
    return res.status(200).json({
      team,
    });
  } catch (err) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: { err },
    });
  }
}

async function createTeam(req, res) {
  const { teamName, teamAKA, regionName, country, manager } = req.body;
  try {
    const team = await Team.create({
      teamName,
      teamAKA,
      regionName,
      country,
      manager,
    });
    return res.status(200).json({ team });
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

async function editTeam(req, res) {
  const idTeam = req.params.id;
  const body = req.body;
  try {
    const team = await Team.findByPk(idTeam);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }
    await team.update(body);
    res.status(200).json({
      team,
    });
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

async function deleteTeam(req, res) {
  const idTeam = req.params.id;
  try {
    const team = await Team.findByPk(idTeam);
    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }
    await team.destroy();

    return res.status(204).json({
      message: "Team deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
      data:err
  })
  }
}

module.exports = {
  getTeam,
  getTeams,
  createTeam,
  editTeam,
  deleteTeam,
};
