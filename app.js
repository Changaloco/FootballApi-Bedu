require('dotenv').config();

const express = require('express');
const sequelize = require('./config/db');
const routes = require('./routes/index');


const app = express()
app.use(express.json())

app.use('/api', routes);

try {
    sequelize.authenticate()
    sequelize.sync()
} catch (error) {
    console.log(error)
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})