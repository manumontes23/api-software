const helloWorld = require("./routes/holaMundo");
const riesgos = require("./routes/riesgos");

module.exports = (app) => {
  app.use(helloWorld);
  app.use(riesgos);
};
