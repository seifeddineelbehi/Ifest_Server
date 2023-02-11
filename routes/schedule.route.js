const router = require("express").Router();
const { route } = require("express/lib/application");
const scheduleController = require("../controller/schedule.controller");
require('../config/passeport')
const passport = require('passport');

/**
 * @Path /schedule
 */

router.post("/addSchedule/", passport.authenticate('jwt', { session: false }), scheduleController.addSchedule)


router.get("/getSchedule/", passport.authenticate('jwt', { session: false }), scheduleController.getSchedule)

module.exports = router;