const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const { User } = require("../models/user.model");
const { Administrator } = require("../models/administrators.model");

const passport = require("passport");
require("dotenv").config();

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        Administrator.findById(jwt_payload.id, function (err, admin) {
          if (err) {
            return done(err, false);
          }
          if (admin) {
            return done(null, admin);
          }
        });
      }
    });
  })
);
