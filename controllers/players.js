const Player = require('../models/player')



// POST /players
// Create a new player

async function createPlayer(req, res) {
    const { playerName, playerSurname, birthDate, position } = req.body
    try {
        let newPlayer = await Player.create({
            playerName,
            playerSurname,
            birthDate,
            position
        }, {
            fields: ['playerName', 'playerSurname', 'birthDate', 'position']
        })
        if (newPlayer) {
            return res.status(201).json({
                message: 'Player created successfully',
                player: newPlayer
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        })
    }
}


module.exports = {
    createPlayer
}