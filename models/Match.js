const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Team = require("./Team");
const Tournament = require("./Tournament");

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
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        customValidator: (value) => {
            const enums = ['home', 'away', 'draw']
            if (!enums.includes(value)) {
                throw new Error('not a valid option')
            }
        }
    }
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

Match.belongsTo(Tournament, {foreignKey: 'id_tournament'});
Tournament.hasMany(Match, {foreignKey: 'id_tournament'});

Match.belongsTo(Team, {foreignKey: 'id_home', as: 'home'});
Team.hasMany(Match, {foreignKey: 'id_home', as: 'home'});
Match.belongsTo(Team, {foreignKey: 'id_away', as: 'away'});
Team.hasMany(Match, {foreignKey: 'id_away', as: 'away'});

module.exports = Match;
