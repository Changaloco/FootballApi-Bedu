const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Player = sequelize.define('Player', {
    id_player: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    playerName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    playerSurname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },

    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    position: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})


module.exports = Player