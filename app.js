require('dotenv').config()

const express = require('express')
const sequelize = require('./config/db')
const routes = require('./routes/index')

const options = require('./swagger')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const Usuario = require('./models/Usuario')
const Player = require('./models/player')



const app = express()
app.use(express.json())

app.use('/', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)))

try {
    sequelize.authenticate()
    sequelize.sync()
} catch (error) {
    console.log(error)
}

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})