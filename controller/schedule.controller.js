const { Schedule } = require("../models/schedule.model");

module.exports = {
  addSchedule: async (req, res) => {
    console.log(req.body);
    if (req.admin.username != null){
      const schedule = new Schedule({
        ...req.body,
      });
      await schedule.save();
      res.status(200).json(schedule);
    }else {
      res.status(401).send({
        success: false,
        message: "Unauthorized!",
      });
    }
    
   
  },

  getSchedule: async (req, res) => {
    const scheduleVenue = await Schedule.findOne({ type: "venue" })
      .sort({ _id: -1 })
      .limit(1);
    const scheduleHotel = await Schedule.findOne({ type: "hotel" })
      .sort({ _id: -1 })
      .limit(1);
    res.status(200).json({ hotel: scheduleHotel, venue: scheduleVenue });
  },
};
