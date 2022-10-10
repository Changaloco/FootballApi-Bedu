const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Player = require("./Player");
const Tournament = require("./tournament");
const Team = require("./Team");

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
      type: DataTypes.STRING,
      validate: {
        customValidator: (value) => {
            const enums = ['goalkeeper', 'defender', 'midfielder', 'striker'];
            if (!enums.includes(value)) {
                throw new Error('not a valid option')
            }
        }
    }
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
Squad.belongsTo(Player, { foreignKey: "id_player" });
Player.hasMany(Squad, { foreignKey: "id_player" });
Squad.belongsTo(Tournament, { foreignKey: "id_tournament" });
Tournament.hasMany(Squad, { foreignKey: "id_tournament" });
Squad.belongsTo(Team, { foreignKey: "id_team" });
Team.hasMany(Squad, { foreignKey: "id_team" });

module.exports = Squad;
