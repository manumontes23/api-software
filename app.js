const express = require("express");
const app = express();

const setUpRoutes = require("./routes");
const setUpExpress = require("./config/express.config");

setUpExpress(app);
setUpRoutes(app);


module.exports = app;