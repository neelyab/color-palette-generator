const router = require("express").Router();
const controller = require("./colorPalette.controller");

router.route("/").get(controller.read);

module.exports = router;
