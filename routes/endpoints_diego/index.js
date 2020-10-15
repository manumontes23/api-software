
const controller = require("./riesgos.controller");
const express = require("express");
const router = express.Router();

router.get("/perdidaEsperada/:entidad/reporte", controller.getPerdidaEsperada);
router.post("/riesgoCredito/:entidad", controller.crearRiesgoCredito);


module.exports = router;