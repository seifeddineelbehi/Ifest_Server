const router = require("express").Router();
const { route } = require("express/lib/application");
const userController = require("../controller/user.controller");


/**
 * @Path /user
 */

//router.route("/sign")
//   .post(userController.signUpUser)
//  .get(userController.signInUser);
router
  .post("/signup/", userController.signUpUser)
router
  .post("/login/", userController.signInUser)
router.post("/updateProfile/", userController.updateProfile)
module.exports = router;