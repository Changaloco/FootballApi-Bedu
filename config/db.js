const { Sequelize } = require('sequelize');
// Conexion a postgres 
const sequelize = new Sequelize('postgres://footballApi_Admin:password@localhost:5432/footballApi');
// export
module.exports = sequelize;