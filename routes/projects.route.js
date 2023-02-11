const router = require("express").Router();
const { route } = require("express/lib/application");
const projectController = require("../controller/projects.controller");
require('../config/passeport')
const passport = require('passport');
/**
 * @Path /projects
 */

router.post("/addProject/", passport.authenticate('jwt', { session: false }), projectController.addProject);

module.exports = router;
