const mongoose = require("mongoose");

const generalPlaningSchema = mongoose.Schema(
  {
    date: {
      type: String,
      default: "Date",
    },
    planing: [
        {
          type: mongoose.Types.ObjectId,
          ref: "EventPlaning",
          default: [],
        },
      ],
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const GeneralPlaning = mongoose.model("GeneralPlaning", generalPlaningSchema);

module.exports = { GeneralPlaning };
