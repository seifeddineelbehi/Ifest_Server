const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    projectId: String,
    role: String,
    phoneNumber: Number,

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = { User };