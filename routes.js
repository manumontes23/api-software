
const helloWorld = require("./routes/endpoints_juan")

module.exports = app => {
  app.use(helloWorld);
};