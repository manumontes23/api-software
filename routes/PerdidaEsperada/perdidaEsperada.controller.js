const { DBName, client } = require("../../config/mongo.config");
const { isThereAnyConnection } = require("../../utils/helper");
const { ObjectID } = require("mongodb");
const collection = "riesgos";
const perdidaCollection = "perdidaEsperada";
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

function perdidaEsperada(req, res) {
    let body = req.body;
    if(body.pd && body.ead && body.lgd){
        let Pe = body.pd  * body.lgd * body.ead
        myCache.set( 'PerdidaE',Pe, 1000 );
        let fun = (dataBase) =>
      dataBase.collection(collection).insertOne(data, (err, item) => {
        if (err) throw err;
        if (item.result.n > 0) {
          res.status(201).send({
            status: true,
            data,
            message: `Elemento agregado exitosamente`,
          });
        } else {
          res.status(401).send({
            status: false,
            data: [],
            message: `No se pudo crear el concepto, por favor intenta de nuevo`,
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
    }else{
        myCache.set( 'PerdidaE',0, 1000 );;
        res.status(400).send({            
            message:'Error al Calcular Perdida Esperada'
        });
    }  ;
};

function obtenerPerdidaEsperada(req, res) {
    let { id } = req.params;
    if (id) {
      let fun = (dataBase) =>
        dataBase
          .collection(perdidaCollection)
          .findOne({ _id: ObjectID(id) }, (err, item) => {
            if (err) throw err;
            if (item) {
                myCache.set( 'PerdidaE',item.perdidaEsperada, 1000 )
              res.status(201).send({
                status: true,
                data: item,
                message: `Perdida Esperada de la empresa`,
              });
            } else {
              res.status(401).send({
                status: false,
                data: [],
                message: `No se encontro información sobre la perdida esperada`,
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
      };

      function modificarPerdidaEsperada(req, res) {
        const { pd, lgd, ead } = req.body;
        const { id } = req.params;
      
        if (pd && lgd && ead && id) {
            let Pe= pd * lgd * ead
          myCache.set( 'PerdidaE',Pe, 1000 )
          let fun = (dataBase) =>
            dataBase
              .collection(perdidaCollection)
              .updateOne(
                { id },
                { $set: { perdidaEsperada: pd * lgd * ead } },
                (err, item) => {
                  if (err) throw err;
                  if (item.result.n > 0) {
                    res.status(200).send({
                      status: true,
                      data: {
                        valor: pd * lgd * ead,
                      },
                      message: `Valor de la perdida esperada calculada`,
                    });
                  } else {
                    res.status(401).send({
                      status: false,
                      data: [],
                      message: `No se encontró la entidad`,
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

      function eliminarPerdidaEsperada(req, res) {
        let { id } = req.params;
      
        if (id) {
          let fun = (dataBase) =>
            dataBase
              .collection(perdidaCollection)
              .deleteOne({ _id: ObjectID(id) }, (err, item) => {
                if (err) throw err;
                if (item.result.n > 0) {
                  res.status(200).send({
                    status: true,
                    message: `Elemento eliminado`,
                  });
                } else {
                  res.status(401).send({
                    status: false,
                    data: [],
                    message: `No se encontró la perdida esperada`,
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

function recuperacionPe(req,res){    
    let pe = myCache.get( 'PerdidaE');
    console.log(pe)
    if (pe!=null){
        let recuPe = pe * 0.3;
        res.status(200).send({
            status: true,
            data: recuPe,
            message: `recuperación Calculada con exito`,
          });
    }else{
        res.status(400).send({
            message:'Error al Calcular la recuperacion en base a la Perdida Esperada'
        });
    };
};


module.exports={
    perdidaEsperada,
    recuperacionPe,
    obtenerPerdidaEsperada,
    modificarPerdidaEsperada,
    eliminarPerdidaEsperada
};