const router = require("express").Router();
const { route } = require("express/lib/application");
const generalPlaningController = require("../controller/general_palanning.controller");
require('../config/passeport')
const passport = require('passport');
/**
 * @Path /generalPlaning
 */

router.post("/addGeneralPlaning/", passport.authenticate('jwt', { session: false }), generalPlaningController.addGeneralPlanning);


router.get("/getGeneralPlaningByWeek/", passport.authenticate('jwt', { session: false }), generalPlaningController.getGeneralPlanningByWeek);

router.get("/getAllGeneralPlaning/", generalPlaningController.getAllGeneralPlanning);

module.exports = router;
