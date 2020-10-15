const express = require("express");
const router = express.Router();
const controller = require("./riesgos.controller");

router.post("/riesgos", controller.crearRiesgo);
router.get("/riesgos/:id", controller.obtenerRiesgo);
router.put("/riesgos/:id", controller.modificarRiesgo);
router.delete("/riesgos/:id", controller.eliminarRiesgo);

module.exports = router;
