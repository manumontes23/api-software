
const controller = require("./holaMundo.controller");
const express = require("express");
const router = express.Router();

router.get("/", controller.getHello);


module.exports = router;