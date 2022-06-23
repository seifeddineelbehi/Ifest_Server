const { Schedule } = require("../models/schedule.model");

module.exports = {
    addSchedule: async (req, res) => {
        console.log(req.body)
        const schedule = new Schedule({
            ...req.body,
        });
        await schedule.save();
        res.status(200).json(schedule)
    },


    getSchedule: async (req, res) => {
        const scheduleVenue = await Schedule.findOne({ type: "venue" }).sort({ _id: -1 }).limit(1)
        const scheduleHotel = await Schedule.findOne({ type: "hotel" }).sort({ _id: -1 }).limit(1)
        res.status(200).json({ hotel: scheduleHotel, venue: scheduleVenue })
    }

}