const Player = require("../models/Player");

// POST /players
// Create a new player
async function createPlayer(req, res) {
  const { playerName, playerSurname, birthDate, position } = req.body;
  try {
    const player = await Player.create({
      playerName,
      playerSurname,
      birthDate,
      position,
    });

    if (!player) {
      return res.status(409).json({
        message: "Conflict",
      });
    }

    if (!playerName || !playerSurname || !birthDate || !position) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    return res.status(201).json({
      id_player: player.id_player,
      playerName,
      playerSurname,
      birthDate,
      position,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error.message,
    });
  }
}

async function getPlayers(req, res) {
  const options = {};
  const { limit, offset } = req.query;
  if (limit && offset) {
    options.limit = limit;
    options.offset = offset;
  }
  try {
    const players = await Player.findAll(options);
    return res.status(200).json({
      players,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Something goes wrong",
      data: error.message,
    });
  }
}

// GET /players/:id_player
// Get all players by id
async function getPlayerById(req, res) {
  const playerId = req.params.id_player;
  try {
    const players = await Player.findByPk(playerId);

    if (!players) {
      return res.status(404).json({
        message: "Not found player with this id: " + playerId,
      });
    }

    return res.status(200).json({
      id_player: players.id_player,
      playerName: players.playerName,
      playerSurname: players.playerSurname,
      birthDate: players.birthDate,
      position: players.position,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error.message,
    });
  }
}

// PUT /players/:id_player
// Update a player by id
async function updatePlayerById(req, res) {
  const playerId = req.params.id_player;
  const { playerName, playerSurname, birthDate, position } = req.body;
  try {
    const players = await Player.findByPk(playerId);

    if (!players) {
      return res.status(404).json({
        message: "Not found player with this id: " + playerId,
      });
    }

    if (!playerName || !playerSurname || !birthDate || !position) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    players.playerName = playerName;
    players.playerSurname = playerSurname;
    players.birthDate = birthDate;
    players.position = position;

    await players.save();

    return res.status(200).json({
      id_player: players.id_player,
      playerName,
      playerSurname,
      birthDate,
      position,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
}

// DELETE /players/:id_player
// Delete a player by id

async function deletePlayerById(req, res) {
  const playerId = req.params.id_player;
  try {
    const players = await Player.findByPk(playerId);

    if (!players) {
      return res.status(404).json({
        message: "Not found player with this id: " + playerId,
      });
    }

    await players.destroy();

    return res.status(200).json({
      message: "Player deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error.message,
    });
  }
}

module.exports = {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayerById,
  deletePlayerById,
};
