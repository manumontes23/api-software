
const helloWorld = require("./routes/holaMundo")

module.exports = app => {
  app.use(helloWorld);
};