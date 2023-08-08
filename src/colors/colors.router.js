const router = require("express").Router();
const controller = require("./colors.controller");

router.route("/").get(controller.read);

module.exports = router;