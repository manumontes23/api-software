const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const collection = "riesgosCredito"


/**
 * Obtiene el reporte de la perdida esperada de una entidad.
 * @param {Json} req argumento solicitado
 * @param {*} res argumento de respuesta
 */
function getPerdidaEsperada(req, res) {
  const {pd, lgd, ead} = req.body
  const {entidad} = req.params
  if (pd && lgd && ead) {
    let pe = pd*lgd*ead
  
    res.status(200).send({
      status: true,
      entity:entidad,
      data: pe,
      message: `La perdida esperada para la entidad ${entidad} es ${pe}`,
    });
  }else{
    res.status(404).send({
      status: false,
      entity:entidad,
      data: [],
      message: `Parametros incompletos`,
    });
  } 
}


/**
 * Crea un nuevo riesgo de credito en la BD
 * @param {Json} req argumento solicitado
 * @param {*} res argumento de respuesta
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
  getPerdidaEsperada,
  crearRiesgoCredito
};
