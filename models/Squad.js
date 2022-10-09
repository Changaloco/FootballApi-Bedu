const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Squad = sequelize.define("Squad", {
  id_squad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  tournamentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  winner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  typeTournament: {
    type: DataTypes.ENUM,
    values: ["torneo", "liga"],
    allowNull: false,
  },
  fk_team: {
    field: "id_team",
    type: DataTypes.INTEGER,
    references: {
      model: "Team",
      key: "id_team",
    },
  },
  fk_player: {
    field: "id_player",
    type: DataTypes.INTEGER,
    references: {
      model: "Player",
      key: "id_player",
    },
  },
  fk_tournament: {
    field: "id_tournament",
    type: DataTypes.INTEGER,
    references: {
      model: "Tournament",
      key: "id_tournament",
    },
  }
},{
  freezeTableName: true,
  timestamps: false,
});

module.exports = Squad;
