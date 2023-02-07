const router = require("express").Router();
const { route } = require("express/lib/application");
const administratorsController = require("../controller/administrators.controller");

/**
 * @Path /admin
 */

router.post("/signUpAdmin/", administratorsController.signUpAdmin);
router.post("/signInAdmin/", administratorsController.signInAdmin);
module.exports = router;
