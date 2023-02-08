const router = require("express").Router();
const { route } = require("express/lib/application");
const projectController = require("../controller/projects.controller");

/**
 * @Path /projects
 */

router.post("/addProject/", projectController.addProject);

module.exports = router;
