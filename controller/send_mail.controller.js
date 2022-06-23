const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: "OAuth2",
        user: "Ifest.app.help@gmail.com",
        accessToken: "ya29.a0ARrdaM92pEDSL3EqCGyAjtoTN0oGHVm0RFDCX0SRnHBVAHeIONNekQpPWxXWGIjMLig26YhHSYuKSir7tAyXGqs6kQ3lojqT2GdfT9w351SyMj7VTt910lYrgheZ6W37iQK6X369dD2RPP10rAfsMZdx9z_-",
    },
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