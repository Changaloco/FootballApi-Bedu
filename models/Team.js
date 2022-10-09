const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Team = sequelize.define("Team", {
  id_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teamAKA: {
    type: DataTypes.STRING(3),
    allowNull: false,
  },
  regionName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  manager:{
    type: DataTypes.STRING,
    allowNull: true,
  }
},{
  freezeTableName: true,
  timestamps: false,
});
module.exports = Team;