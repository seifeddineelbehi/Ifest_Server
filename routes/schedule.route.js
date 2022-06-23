const router = require("express").Router();
const { route } = require("express/lib/application");
const scheduleController = require("../controller/schedule.controller");


/**
 * @Path /schedule
 */

router.post("/addSchedule/", scheduleController.addSchedule)


router.get("/getSchedule/", scheduleController.getSchedule)

module.exports = router;