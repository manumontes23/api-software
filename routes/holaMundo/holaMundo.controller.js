const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const collection = "riesgos"


function getHello(req, res) {
  let fun = (DB) =>
    DB
      .collection(collection)
      .find()
      .toArray((err, items) => {
        if (err) throw err;
        if (items.length > 0) {
          res.status(200).send({
            status: true,
            data: items,
            message: "Desde la base de datos",
          });
        } else {
          res.status(400).send({
            status: false,
            data: [],
            message: "Coleccion de la bd vacía",
          });
        }
      });
  if (isThereAnyConnection(client)) {

    const DB = client.db(DBName);
    fun(DB);
  } else {
    client.connect((err) => {
      if (err) throw err;
      const DB = client.db(DBName);
      fun(DB);
    });
  }
}


module.exports = {
    getHello,
};
