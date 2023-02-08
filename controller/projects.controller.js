const { Project } = require("../models/projects.model");

module.exports = {
  addProject: async (req, res) => {
    console.log(req.body);
    const project = new Project({
      ...req.body,
    });
    await project.save();
    res.status(200).json(project);
  },
};
