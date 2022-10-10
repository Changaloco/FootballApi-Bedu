const Tournament = require("../models/Tournament");

// POST /tournaments
// Create a new tournament
async function createTournament(req, res) {
  const { tournamentName, year, startDate, endDate, winner, typeTournament } =
    req.body;
  try {
    const tournament = await Tournament.create({
      tournamentName,
      year,
      startDate,
      endDate,
      winner,
      typeTournament,
    });

    if (!tournament) {
      return res.status(409).json({
        message: "Conflict",
      });
    }

    if (
      !tournamentName ||
      !year ||
      !startDate ||
      !endDate ||
      !winner ||
      !typeTournament
    ) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    return res.status(201).json({
      id_tournament: tournament.id_tournament,
      tournamentName,
      year,
      startDate,
      endDate,
      winner,
      typeTournament,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error.message,
    });
  }
}

// GET /tournaments
// Get all tournaments
async function getTournaments(req, res) {
  const options = {

  }
  const {limit, offset} = req.query;
  if(limit && offset){
    options.limit = parseInt(limit);
    options.offset = parseInt(offset);
  }
  try {
    const tournaments = await Tournament.findAll(options);
    return res.status(200).json({
      tournaments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data:error.message,
    });
  }
}

// GET /tournaments/:id_tournament
// Get all tournaments by name
async function getTournamentById(req, res) {
  const tournamentId = req.params.id_tournament;
  try {
    const tournaments = await Tournament.findByPk(tournamentId);

    if (!tournaments) {
      return res.status(404).json({
        message: "Tournament not found with id: " + tournamentId,
      });
    }

    return res.status(200).json({
      id_tournament: tournaments.id_tournament,
      tournamentName: tournaments.tournamentName,
      year: tournaments.year,
      startDate: tournaments.startDate,
      endDate: tournaments.endDate,
      winner: tournaments.winner,
      typeTournament: tournaments.typeTournament,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data:error.message,
    });
  }
}

// UPDATE /tournaments/:id_tournament
// Update a tournament by id
async function updateTournamentById(req, res) {
  const tournamentId = req.params.id_tournament;
  const { tournamentName, year, startDate, endDate, winner, typeTournament } =
    req.body;
  try {
    const tournaments = await Tournament.findByPk(tournamentId);

    if (!tournaments) {
      return res.status(404).json({
        message: "Tournament not found with id: " + tournamentId,
      });
    }

    tournaments.tournamentName = tournamentName;
    tournaments.year = year;
    tournaments.startDate = startDate;
    tournaments.endDate = endDate;
    tournaments.winner = winner;
    tournaments.typeTournament = typeTournament;

    await tournaments.save();

    return res.status(200).json({
      id_tournament: tournaments.id_tournament,
      tournamentName: tournaments.tournamentName,
      year: tournaments.year,
      startDate: tournaments.startDate,
      endDate: tournaments.endDate,
      winner: tournaments.winner,
      typeTournament: tournaments.typeTournament,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
}

// DELETE /tournaments/:id_tournament
// Delete a tournament by id
async function deleteTournamentById(req, res) {
  const tournamentId = req.params.id_tournament;
  try {
    const tournaments = await Tournament.findByPk(tournamentId);

    if (!tournaments) {
      return res.status(404).json({
        message: "Tournament not found with id: " + tournamentId,
      });
    }

    await tournaments.destroy();

    return res.status(200).json({
      message: "Tournament deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error.message,
    });
  }
}



module.exports = {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournamentById,
  deleteTournamentById,
};
