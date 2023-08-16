const Events  = require("../models/events.model");
const Users  = require("../models/user.model");
const EventPlaning = require("../models/event_planing.model");
const fs = require("fs");
const e = require("express");


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

function parseDate(dateString) {
  let dateParts = dateString.split(/[-\/]/);

  let year = dateParts[2];
  let month = dateParts[1] - 1;
  let day = dateParts[0];

  return new Date(year, month, day);
}


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
      image,
      eventAbout,
      planing,
      latitude,
      longitude
    } = req.body;
    const dateString = eventDate;

    let date = parseDate(dateString);
    console.log('new date : ' + date)
    if (req.user.username != null) {
      const event = new Events({
        eventName,
        eventLocation,
        eventPrice,
        eventDate,
        eventTime,
        eventAbout,
        image,
        latitude,
        longitude
      });
      event.eventDate=date;
      var listPlanning = [];

      for (let index = 0; index < planing.length; index++) {

        const element = planing[index];

        const eventPlaning = new EventPlaning({ ...element });

        await eventPlaning.save();

        listPlanning.push(eventPlaning);
      }



      event.planing.push(...listPlanning);
      const newEvent = await event.save();
      console.log(newEvent._id);
      SetupEventFolder(newEvent._id);
      res.status(200).send({
        success: true,
        message: "Event added successfully!",
        eventDetails: event,
      });
    } else {
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

  likeEvent :async (req,res) =>{
    const idUser = req.user._id;
    const idevent = req.params.idevent
    var indexLikes = -1 ;
    var indexUnLikes = -1 ;
    if (idUser){
      try{
        const user = req.user
        const event =  await Events.findById(idevent).populate([
          {
            path: "likes",
            model: "User",
          },
          {
            path: "unlikes",
            model: "User",
          },
        ]);
        event.unlikes.forEach(element => {
       
          if (element._id.equals(user._id)){
            indexUnLikes = event.unlikes.indexOf(element);
            event.unlikes.splice(indexUnLikes,1);
            
          }
        });
        event.likes.forEach(element => {
       
          if (element._id.equals(user._id)){
            indexLikes = event.likes.indexOf(element);
            
          }
        });

        if (indexLikes == -1){
          event.likes.push(user);
        }
        const newevent = await event.save();
        res.status(200).send({
          success: true,
          message: "Event liked",
          event: newevent
        });
      }catch (error){
        res.status(403).send({
          success: false,
          message: error,
        });
    } 
    }
  },

  unslikeEvent :async (req,res) =>{
    const idUser = req.user._id;
    const idevent = req.params.idevent
    var indexLikes = -1 ;
    var indexUnLikes = -1 ;
    if (idUser){
      try{
        const user = req.user;
        const event =  await Events.findById(idevent).populate([
          {
            path: "likes",
            model: "User",
          },
          {
            path: "unlikes",
            model: "User",
          },
        ]);
 
        event.likes.forEach(element => {
       
          if (element._id.equals(user._id)){
            indexLikes = event.likes.indexOf(element);
            event.likes.splice(indexLikes,1);
            
          }
        });
        event.unlikes.forEach(element => {
       
          if (element._id.equals(user._id)){
            indexUnLikes = event.unlikes.indexOf(element);
            
          }
        });
        if (indexUnLikes == -1){
          event.unlikes.push(user);
        }
        const newevent=await event.save();
        res.status(200).send({
          success: true,
          message: "Event unliked",
          event: newevent
        });
      }catch (error){
        res.status(403).send({
          success: false,
          message:error,
        });
    } 
    }
  },
};
