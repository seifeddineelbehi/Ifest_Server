const router = require("express").Router();
const { route } = require("express/lib/application");
const mailController = require("../controller/send_mail.controller");

require('../config/passeport')
const passport = require('passport');
/**
 * @Path /sendMail
 */

router.post("/sendEmail/", passport.authenticate('jwt', { session: false }), mailController.sendMail)

module.exports = router;