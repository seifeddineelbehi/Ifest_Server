const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    id: {
      type: String,
      default: "id",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);
const Project = mongoose.model("Project", projectSchema);

module.exports = { Project };
