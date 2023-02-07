const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'oauth2',
        user: "ifest.app.help@gmail.com", // Your gmail address.
        clientId: "387800876011-perqhqt6kdrka292n49g5urk33vpvu1l.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04CGhf7nz83lwCgYIARAAGAQSNwF-L9IryQxAG4n3ZOcSgd_pEDE6lF6EnKPxCpadNK8DLUlg17X9-JiFhdaQ4dVItQmJQ8rv4bY",
    }
});

module.exports = {

    sendMail: async (req, res) => {
        var body = "<center>"
            + "   <br>"
            + "   <h2>Sender Email: </h2>" + "<p>" + req.body.userEmail + "</p>"
            + "   <br>"
            + "   <h2>Sender Full Name: </h2>" + "<p>" + req.body.userName + "</p>"
            + "   <br>"
            + "   <h2>Sender Phone Number: </h2>" + "<p>" + req.body.userNumber + "</p>"
            + "   <br>"
            + "   <h2>Email Body: </h2>" + "<p>" + req.body.emailBody + "</p>"
            + "</center>"

        var message = {
            from: 'Ifest.app.help <Ifest.app.help@gmail.com>',
            to: "info.atast@gmail.com",
            subject: req.body.emailType,
            html: body,

        }

        transporter.sendMail(message, function (err, info) {
            if (err) {
                res.status(400)
                console.log(err)
            } else {
                console.log("qsfqsfqfqfqsfsq")
                res.status(200).json(info)
                console.log(info);
            }
        })
    }

}