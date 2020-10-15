const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const { ObjectID } = require("mongodb");
const collection = "riesgos";

function crearRiesgo(req, res) {
  let body = req.body;

  if (body.name && body.description && body.subRiesgos) {
    let fun = (dataBase) =>
      dataBase.collection(collection).insertOne(
        {
          name: body.name,
          description: body.description,
          subRiesgos: body.subRiesgos,
        },
        (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(201).send({
              status: true,
              data: item.data.ops,
              message: `Elemento agregado exitosamente`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se pudo crear el concepto, por favor intenta de nuevo`,
            });
          }
        }
      );

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
      message: `No se pudo crear el concepto, por favor intenta de nuevo`,
    });
  }
}

function obtenerRiesgo(req, res) {
  let { id } = req.params;
  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .findOne({ _id: ObjectID(id) }, (err, item) => {
          if (err) throw err;
          if (item) {
            res.status(201).send({
              status: true,
              data: item,
              message: `Elemento encontrado`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se encontró el archivo`,
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
      message: `No se pasaron los parametros necesarios`,
    });
  }
}

function modificarRiesgo(req, res) {
  let { id } = req.params;
  let body = req.body;

  if (id && body.name && body.description && body.subRiesgos) {
    let fun = (dataBase) =>
      dataBase.collection(collection).updateOne(
        { _id: ObjectID(id) },
        {
          $set: {
            name: body.name,
            description: body.description,
            subRiesgos: body.subRiesgos,
          },
        },
        (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(201).send({
              status: true,
              data: {
                name: body.name,
                description: body.description,
                subRiesgos: body.subRiesgos,
              },
              message: `Elemento cambiado`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se encontró el archivo`,
            });
          }
        }
      );

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
      message: `No se pasaron los parametros necesarios`,
    });
  }
}

function eliminarRiesgo(req, res) {
  let { id } = req.params;

  if (id) {
    let fun = (dataBase) =>
      dataBase
        .collection(collection)
        .deleteOne({ _id: ObjectID(id) }, (err, item) => {
          if (err) throw err;
          if (item.result.n > 0) {
            res.status(201).send({
              status: true,
              message: `Elemento eliminado`,
            });
          } else {
            res.status(401).send({
              status: false,
              data: [],
              message: `No se encontró el riesgo`,
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
      message: `No se pasaron los parametros necesarios`,
    });
  }
}

module.exports = {
  crearRiesgo,
  obtenerRiesgo,
  modificarRiesgo,
  eliminarRiesgo,
};
