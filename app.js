var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
require("./config/passeport");
const passport = require("passport");
var usersRouter = require("./routes/user.route");
var scheduleRouter = require("./routes/schedule.route");
var mailRouter = require("./routes/send_mail.route");
var eventsRouter = require("./routes/events.route");
var projectsRouter = require("./routes/projects.route");
var administratorsRouter = require("./routes/administrators.route");
var generalPlaningRouter = require("./routes/general_planing.route");
const pushNotif = require("./routes/PushNotification");

var cron = require("node-cron");

var app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

// view engine setup
app.use(passport.initialize());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("./uploads"));


app.use("/user", usersRouter);
app.use("/schedule", scheduleRouter);
app.use("/sendMail", mailRouter);
app.use("/events", eventsRouter);
app.use("/projects", projectsRouter);
app.use("/admin", administratorsRouter);
app.use("/generalPlaning", generalPlaningRouter);
app.use("/pushNotif", pushNotif);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT, () => {

  cron.schedule(`1 */1 * * * *`, function () {
    console.log("Listening on port 3000...");
  });
})

module.exports = app;
