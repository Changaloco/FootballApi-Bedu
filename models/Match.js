const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Match = sequelize.define(
  "Match",
  {
    id_match: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    winner: {
      type: DataTypes.ENUM,
      values: ["home", "away", "draw"],
      allowNull: true,
    },
    homeGoals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    awayGoals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    matchDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fk_tournament: {
      field: "id_tournament",
      type: DataTypes.INTEGER,
      references: {
        model: "Tournament",
        key: "id_tournament",
      },
    },
    fk_away: {
      field: "id_away",
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "id_team",
      },
    },
    fk_home: {
      field: "id_home",
      type: DataTypes.INTEGER,
      references: {
        model: "Team",
        key: "id_team",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Match;
