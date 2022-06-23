const mongoose = require("mongoose")


const scheduleSchema = mongoose.Schema({
    current: String,
    next: String,
    type: String,
    time: String,
}, {
    timestamps: true
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = { Schedule };