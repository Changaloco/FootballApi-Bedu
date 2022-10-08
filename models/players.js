const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../config/db");

const Player = sequelize.define('Player', {
    playerName: {
        type:DataTypes.CHAR(64),
        allowNull: false
    },
    playerSurName:{
        type:DataTypes.CHAR(128),
        allowNull:false
    },
    birthDate:{
        type: DataTypes.DATEONLY(),
        allowNull: false,
    },
    posicion: {
        type:DataTypes.CHAR(64),
        allowNull: false
    }
});

module.exports = Player;