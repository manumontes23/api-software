
const controller = require("./riesgos.controller");
const express = require("express");
const router = express.Router();

//URI get  perdida esperada ()
router.get("/perdidaEsperada/:entidad/reporte", controller.reportePerdidaEsperada);
//URI Post riesgo de credito
router.post("/riesgoCredito/:entidad", controller.crearRiesgoCredito);


module.exports = router;