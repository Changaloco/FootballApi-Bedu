require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");
const routes = require("./routes/index");

const options = require("./swagger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const Usuario = require("./models/Usuario");
const Player = require("./models/player");
const Team = require("./models/Team");
const Tournament = require("./models/tournament");
const Squad = require("./models/Squad");
const Match = require("./models/Match");

const auth = require("./middlewares/auth");

const app = express();
app.use(express.json());

app.use(auth.optional);
app.use("/", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(options)));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

try {
  sequelize.authenticate();
  sequelize.sync({
    //force: true,
  });
} catch (error) {
  console.log(error);
}
