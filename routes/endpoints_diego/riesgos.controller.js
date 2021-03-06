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
  let { id } = req.params;
  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection2)
        .findOne({ id }, (err, item) => {
          if (err) throw err;
          if (item) {
            res.status(200).send({
              status: true,
              data: item,
              message: `reporte de la entidad ${id}`,
            });
          } else {
            res.status(400).send({
              status: false,
              data: [],
              message: `No existe registro de perdida esperada para la entidad ${id}`,
            });
          }
        })

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
  let { PD, EAD, LGD, impacto, probabilidad, otros } = req.body;
  const { id } = req.params
  if (PD && EAD && LGD && probabilidad && impacto) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .insertOne({ id,  PD, EAD, LGD, probabilidad, impacto, otros }, (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(201).send({
              status: true,
              data: { id,  PD, EAD, LGD, impacto, probabilidad },
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
