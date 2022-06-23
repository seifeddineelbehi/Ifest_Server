const router = require("express").Router();
const { route } = require("express/lib/application");
const mailController = require("../controller/send_mail.controller");


/**
 * @Path /sendMail
 */

router.post("/sendEmail/", mailController.sendMail)

module.exports = router;