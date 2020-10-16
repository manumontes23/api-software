
const helloWorld = require("./routes/holaMundo");
const perdidaEsperada = require("./routes/PerdidaEsperada");

module.exports = app => {
  app.use(helloWorld);
  app.use(perdidaEsperada);
};