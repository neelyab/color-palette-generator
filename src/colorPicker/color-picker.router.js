const router = require("express").Router();
const controller = require("./color-picker.controller");

router.route("/").get(controller.paletteFromPhoto);

module.exports = router;
