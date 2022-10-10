require("dotenv").config();

const express = require("express");
const sequelize = require("./config/db");
const routes = require("./routes/index");

const options = require("./swagger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
  });
} catch (error) {
  console.log(error);
}
