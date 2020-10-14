const { DBName, client } = require("../config/mongo.config");

function routeDoNotExist(req, res, next) {
  res.status(404).send({
    message: "This route does not exist."
  });
  next();
}

function isThereAnyConnection(client) {
  return client.topology
    ? client.topology.s.state === "connected"
      ? true
      : false
    : false;
}

module.exports = {
    routeDoNotExist,
    isThereAnyConnection
  };