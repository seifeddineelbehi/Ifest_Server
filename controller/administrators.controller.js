require("dotenv").config();
const { Administrator } = require("../models/administrators.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signUpAdmin: async (req, res) => {
    const { username, password } = req.body;
    const isAdminFound = await Administrator.findOne({ username: username });

    if (isAdminFound) {
      return res
        .status(402)
        .json({ created: false, message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Administrator({
      ...req.body,
      password: hashedPassword,
    });
    await admin.save();
    res
      .status(200)
      .json({ created: true, message: "Admin Created Successfully" });
  },

  signInAdmin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Administrator.findOne({ username: username });
      if (!admin) {
        return res
          .status(402)
          .json({ created: false, message: "Username doesn't exist" });
      }

      const validPassword = await bcrypt.compare(password, admin.password);
      if (validPassword) {
        const payload = {
          username: admin.username,
          id: admin._id,
        };

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        console.log("aaaaaaaaaaaaaaaa");

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
};
