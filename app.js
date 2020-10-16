const express = require("express");
const app = express();

const setUpRoutes = require("./routes");
const setUpExpress = require("./config/express.config");

setUpExpress(app);
setUpRoutes(app);
app.use((req, res, next) => {
    res.status(404).send({
      message: "Esta ruta no existe"
    });
  });


module.exports = app;