require("dotenv").config();
const { User } = require("../models/user.model");
const { Project } = require("../models/projects.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  
  signUpUser: async (req, res) => {
    const {
      email,
      password,
      firstName,
      lastName,
      projectId,
      role,
      phoneNumber,
      deviceId,
    } = req.body;
    const isUserFound = await User.findOne({ email: email });

    if (isUserFound) {
      return res
        .status(402)
        .json({ created: false, message: "Email already exists" });
    }
    const project = await Project.findOne({ id: projectId });

    if (!project) {
      return res
        .status(401)
        .json({ created: false, message: "ProjectId Doesn't exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json(user);
  },

  signInUser: async (req, res) => {
    const { email, password,deviceId } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(402)
          .json({ created: false, message: "Email doesn't exist" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const payload = {
          username: user.username,
          id: user._id,
        };

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        console.log("aaaaaaaaaaaaaaaa");
        user.deviceId = deviceId;
        await user.save();
        console.log("bbbbbbbbbbbbbb");
        // return res.status(200).json(user);
        return res.status(200).send({
          success: true,
          message: "Logged in successfully!",
          token: "Bearer " + token,
        });
      } else
        return res
          .status(401)
          .json({ created: false, message: "Password wrong" });
    } catch (err) {
      return res.json(null);
    }
  },

  getClientDetails: async (req, res) => {
    if (req.user) {
      return res.status(200).send({
        success: true,
        client: req.user,
      });
    }
  },

  updateProfile: async (req, res) => {

    var user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          birthDate: req.body.birthDate,
          address: req.body.address,
          phoneNumber: req.body.phoneNumber,
        },
      }
    );
    const newUser =  await User.findById(user.id);
    res.status(200).send(newUser);
  },

  addEventToBookmark: async (req, res) => {
    const idUser = req.user._id;
    const idEvent = req.header.idevent;

    try {

      var user = await User.findById(idUser).populate('bookmarkedEvents');

      var event = await Event.findById(idEvent);

      user.bookmarkedEvents.push(event);

      await user.save();


      res.status(201).send({
        success: true,
        message: "Event bookmarked",
        user: user
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error
      });
    }

  },

  removeEventFromBookmark: async (req, res) => {
    const idUser = req.user._id;
    const idEvent = req.header.idevent;

    try {
      var user = await User.findById(idUser).populate('bookmarkedEvents');

      var event = await Event.findById(idEvent);

      const index = user.bookmarkedEvents.indexOf(event);
      user.bookmarkedEvents.splice(index, 1);

      await user.save();


      res.status(201).send({
        success: true,
        message: "Event removed from bookmark",
        user: user
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error
      });
    }

  },
};
