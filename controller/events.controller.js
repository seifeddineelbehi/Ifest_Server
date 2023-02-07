const { Events } = require("../models/events.model");
const { EventPlaning } = require("../models/event_planing.model");

module.exports = {
  addEvent: async (req, res) => {
    const {
      eventName,
      eventLocation,
      eventPrice,
      eventDate,
      eventTime,
      eventAbout,
      planing,
    } = req.body;
    console.log(planing);
    planing.array.forEach(element => {
      const eventPlaning = new EventPlaning({
        element,
      });
      await eventPlaning.save();
    });

    
    // 
    // const event = new Events({
    //   ...req.body,
    //   planing: eventPlaning,
    // });
    // await event.save();
    // res.status(200).send({
    //   success: true,
    //   message: "Event added successfully!",
    //   eventDetails: event,
    // });
  },

  getAllEvents: async (req, res) => {
    var events = await Events.find()
      .populate([
        {
          path: "planing",
          model: "EventPlaning",
        },
      ])
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      list: events,
    });
  },
};
