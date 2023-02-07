const router = require("express").Router();
const { route } = require("express/lib/application");
const eventController = require("../controller/events.controller");

/**
 * @Path /events
 */

router.post("/addEvent/", eventController.addEvent);
router.get("/getAllEvents/", eventController.getAllEvents);

module.exports = router;
