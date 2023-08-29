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

//add event to bookmark
router.post("/addEventToBookmark/", passport.authenticate('jwt', { session: false }), userController.addEventToBookmark);
router.post("/removeEventFromBookmark/", passport.authenticate('jwt', { session: false }), userController.removeEventFromBookmark);

//check user exist
router.get("/userExist/", userController.UserExistByEmail);

//changePassword
router.put("/updatePassword/", userController.updatePassword);

module.exports = router;
