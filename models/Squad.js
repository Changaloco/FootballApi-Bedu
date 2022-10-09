const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Squad = sequelize.define(
  "Squad",
  {
    id_squad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    position: {
      type: DataTypes.ENUM,
      values: ["goalkeeper", "defender", "midfielder", "striker"],
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 99,
      },
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
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Squad;
