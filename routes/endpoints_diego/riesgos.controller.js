const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const collection = "riesgosCredito"
const collection2 = "perdidaEsperada"



/**
 * Obtiene el reporte de la perdida esperada de una entidad.
 * @param {Json} req argumento solicitado
 * @param {Json} res argumento de respuesta
 */
function reportePerdidaEsperada(req, res) {
  const { entidad } = req.params;
  if (entidad) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection2)
        .find({ entidad })
        .toArray((err, item) => {
          if (err) throw err;
          if (item.length > 0) {
            res.status(200).send({
              status: true,
              data: item,
              message: `reporte de la entidad ${entidad}`,
            });
          } else {
            res.status(400).send({
              status: false,
              data: [],
              message: `No existe registro de perdida esperada para la entidad ${entidad}`,
            });
          }
        });
    if (isThereAnyConnection(client)) {
      const dataBase = client.db(DBName);
      fun(dataBase);
    } else {
      client.connect((err) => {
        if (err) throw err;
        const dataBase = client.db(DBName);
        fun(dataBase);
      });
    }
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: "No se han ingresado todos los campos",
    });
  }
}

/**
 * Crea un nuevo riesgo de credito en la BD
 * @param {Json} req argumento solicitado
 * @param {Json} res argumento de respuesta
 */
function crearRiesgoCredito(req, res) {
  const { pi, ci,cc,ed, otros } = req.body;
  const {entidad} = req.params
  if ( pi && ci && cc && ed && otros) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .insertOne({ entidad, pi, ci,cc,ed, otros }, (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(201).send({
              status: true,
              data: { entidad, pi, ci,cc,ed },
              message: `Riesgo creado correctamente`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se pudo crear el riesgo, por favor intenta de nuevo`,
            });
          }
        });
    if (isThereAnyConnection(client)) {
      const dataBase = client.db(DBName);
      fun(dataBase);
    } else {
      client.connect((err) => {
        if (err) throw err;
        const dataBase = client.db(DBName);
        fun(dataBase);
      });
    }
  } else {
    res.status(400).send({
      status: false,
      data: [],
      message: `Necesitas ingresar todos los campos requeridos`,
    });
  }
}


module.exports = {
  reportePerdidaEsperada,
  crearRiesgoCredito
};
