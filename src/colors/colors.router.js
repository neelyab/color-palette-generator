const router = require("express").Router();
const controller = require("./colors.controller");
console.log(controller);
// const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.read);

module.exports = router;