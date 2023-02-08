const mongoose = require("mongoose");

const eventPlaningSchema = mongoose.Schema(
  {
    startTime: {
      type: String,
      default: "Time",
    },
    endTime: {
      type: String,
      default: "Time",
    },
    description: {
      type: String,
      default: "Description",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const EventPlaning = mongoose.model("EventPlaning", eventPlaningSchema);

module.exports = { EventPlaning };
