const controller = require("./perdidaEsperada.controller");
const express = require("express");
const router = express.Router();

router.get("/perdidaEsperada", controller.obtenerPerdidaEsperada);
router.post("/perdidaEsperada", controller.perdidaEsperada);
router.put("/perdidaEsperada", controller.modificarPerdidaEsperada);
router.delete("/perdidaEsperada", controller.eliminarPerdidaEsperada);
router.get("/perdidaEsperada/recuperacion",controller.recuperacionPe);


module.exports = router;