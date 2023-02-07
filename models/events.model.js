const mongoose = require("mongoose");

const eventsSchema = mongoose.Schema(
  {
    eventName: {
      type: String,
      default: "Event Name",
    },
    eventLocation: {
      type: String,
      default: "Event Location",
    },
    eventPrice: {
      type: Number,
      default: 0,
    },
    eventDate: {
      type: String,
      default: "Event Date",
    },
    eventTime: {
      type: String,
      default: "Event Date",
    },
    eventAbout: {
      type: String,
      default: "Event About",
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

const Events = mongoose.model("Events", eventsSchema);

module.exports = { Events };
