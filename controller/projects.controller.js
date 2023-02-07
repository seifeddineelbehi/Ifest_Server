const { Schedule } = require("../models/schedule.model");

module.exports = {
  addSchedule: async (req, res) => {
    console.log(req.body);
    const schedule = new Schedule({
      ...req.body,
    });
    await schedule.save();
    res.status(200).json(schedule);
  },
};
