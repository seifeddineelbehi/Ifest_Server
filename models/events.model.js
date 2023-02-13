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
    eventStartTime: {
      type: String,
      default: "Event Start time",
    },
    eventEndTime: {
      type: String,
      default: "Event End time",

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
    image: {
        type: String,
        default: "image",
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Events = mongoose.model("Events", eventsSchema);

module.exports =  Events ;
