const router = require("express").Router();
const { route } = require("express/lib/application");
const userController = require("../controller/user.controller");
require("../config/passeport");
const passport = require("passport");

/**
 * @Path /user
 */

//router.route("/sign")
//   .post(userController.signUpUser)
//  .get(userController.signInUser);
router.post("/signup/", userController.signUpUser);
router.post("/login/", userController.signInUser);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  userController.getClientDetails
);
router.post("/updateProfile/", passport.authenticate('jwt', { session: false }), userController.updateProfile);

module.exports = router;
