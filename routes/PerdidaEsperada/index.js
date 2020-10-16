const controller = require("./perdidaEsperada.controller");
const express = require("express");
const router = express.Router();

router.get("/perdidaEsperada", controller.perdidaEsperada);
router.get("/recuperacion",controller.recuperacionPe);


module.exports = router;