const router = require("express").Router();
const controller = require("./threadColors.controller");

router.route("/").get(controller.read);

module.exports = router;
