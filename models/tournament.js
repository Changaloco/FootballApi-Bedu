const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Tournament = sequelize.define('Tournament', {
    id_tournament: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    tournamentName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    winner: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    typeTournament: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{
    freezeTableName: true,
    timestamps: false,
  })
    

module.exports = Tournament