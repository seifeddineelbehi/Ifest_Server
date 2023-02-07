const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      default: "username",
      type: String,
    },
    password: {
      default: "password",
      type: String,
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);
const Administrator = mongoose.model("Administrator", AdminSchema);

module.exports = { Administrator };
