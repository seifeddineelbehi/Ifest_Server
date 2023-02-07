const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "firstName",
    },
    lastName: {
      type: String,
      default: "lastName",
    },
    email: {
      type: String,
      default: "email",
    },
    password: {
      type: String,
      default: "password",
    },
    projectId: {
      type: String,
      default: "projectId",
    },
    role: {
      type: String,
      default: "role",
    },
    phoneNumber: {
      type: Number,
      default: 00000000,
    },
    bookmarkedEvents: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Events",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
