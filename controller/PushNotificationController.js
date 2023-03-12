const { ONE_SIGNAL_CONFIG } = require("../config/app.config")
const pushNotificationService = require("../services/push-notification.services")
const { User } = require("../models/user.model");

exports.SendNotificationToDevice =async  (req, res, next) => {

    const users = await User.find({ role: { $ne: "admin" } }).select("deviceId");
        contents = [];
        users.forEach((user) => {
            contents.push(user.deviceId);
        });
        console.log(contents);
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: { en: req.body.content },
        included_segments: ["included_player_ids"],
        include_player_ids: contents,
        content_available: true,
        small_icon: "ic_launcher",
        data: {
            PushTitle: "CUSTOM NOTIFICATION",
        },
    };

    pushNotificationService.SendNotification(message, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
    return res.status(200).send({
        message: "Success",
    });
}