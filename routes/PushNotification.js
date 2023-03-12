const NotificationController = require("../controller/PushNotificationController");
const express = require("express");
const router = express.Router();
/**
 * @Path /pushNotif
 */
// routes
//router.post("/register", ClientsController.Register);

router.post("/sendNotif", NotificationController.SendNotificationToDevice);

module.exports = router;