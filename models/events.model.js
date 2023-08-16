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
      type: Date,
      default: new Date("2023-08-16"),
    },
    eventStartTime: {
      type: String,
      default: "0:00",
    },
    eventEndTime: {
      type: String,
      default: "22:00",

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
    latitude: {
      type: Number,
      default: 0, 
    },
    longitude: {
      type: Number,
      default: 0, 
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default :[],
      },
      
    ],
    unlikes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        default :[],
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

/*
const defaultLatitude = 0; // Set your default latitude value
const defaultLongitude = 0; // Set your default longitude value

// Update all existing documents with default latitude and longitude
Events.updateMany({}, { $set: { latitude: defaultLatitude, longitude: defaultLongitude } })
  .then(result => {
    console.log(`${result.modifiedCount} documents updated.`);
  })
  .catch(error => {
    console.error('Error updating documents:', error);
  });*/
