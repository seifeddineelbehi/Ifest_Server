const mongoose = require("mongoose");

const generalPlaningSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      default: "Date",
    },
    planing: [
        {
          startTime: {
            type: String,
            default: "startTime",
          },
          endTime: {
            type: String,
            default: "endTime",
          },
          description: {
            type: String,
            default: "Description",
          },
        },
      ],
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const GeneralPlaning = mongoose.model("GeneralPlaning", generalPlaningSchema);

module.exports =  GeneralPlaning ;
