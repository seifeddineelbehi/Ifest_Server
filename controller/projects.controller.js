const { Project } = require("../models/projects.model");

module.exports = {
  addProject: async (req, res) => {

    if (req.user.username != null){
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
  bulkAddProject: async (req, res) => {

    if (req.user.username != null){
      for(i = 0; i < req.body.length; i++){
        const project = new Project({
          ...req.body[i],
        });
        await project.save();
      }
      res.status(200).json("success");
    }else {
      res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
   
  },
};
