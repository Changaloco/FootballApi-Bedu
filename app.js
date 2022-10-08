const sequelize = require('./config/db');
const express = require('express');
const app = express();


app.use(express.json());

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connected to DB', error);
}