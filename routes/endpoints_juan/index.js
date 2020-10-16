const controller = require("./riesgos.controller");
const express = require("express");
const router = express.Router();

router.get("/riesgoCredito/:id/registros", controller.obtenerRegistros);
router.get("/riesgoCredito/:id/mapa", controller.generarMapa);


module.exports = router;