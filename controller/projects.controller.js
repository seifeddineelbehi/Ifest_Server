const { Project } = require("../models/projects.model");

module.exports = {
  addProject: async (req, res) => {

    if (req.admin.username != null){
      const project = new Project({
        ...req.body,
      });
      await project.save();
      res.status(200).json(project);
    }else {
      res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
   
  },
};
