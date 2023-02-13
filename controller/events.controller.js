const { Events } = require("../models/events.model");
const { EventPlaning } = require("../models/event_planing.model");
const fs = require("fs");


async function SetupEventFolder(id) {
  const dir = `./uploads/Events/Event-${id}`;

  fs.mkdir(dir, function () {
      fs.exists(dir, function (exist, err) {
          if (exist) {
              const dir2 = `./uploads/Events/Event-${id}/images`;
              fs.mkdir(dir2, function () {
                  console.log("folder created");
              });
          }
      });
  });
};


module.exports = {

  uploadImages: async (req, res) => {
    const eventId = req.headers.idevent;
    try {

        console.log("uploaded");
        //console.log(req.file);
        var pathImage = req.file.path;
        pathImage = pathImage.replaceAll("\\", "/");
        const uploadEvent = await Events.updateOne(
            { _id: eventId },
            {
                $set: {
                    image: pathImage,
                },
            }
        );
        res.status(200).send({
            success: true,
            message: "image uploaded",
            uploadEvent: uploadEvent
        });

    } catch (error) {
        res.status(304).send({
            success: false,
            message: "error upload image",
            error: error
        });
    }
},

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

    if (req.user.username != null){
      const event = new Events({
        ...req.body,
      });

      var listPlanning = [];
      planing.forEach(async element => {
        const eventPlaning = new EventPlaning({
          element,
        });
        await eventPlaning.save();
        listPlanning.push(eventPlaning);
      });

      event.planing.push(...listPlanning);
      await event.save();
      SetupEventFolder(event._id);
      res.status(200).send({
        success: true,
        message: "Event added successfully!",
        eventDetails: event,
      });
    }else {
      res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
    
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
