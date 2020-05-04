const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

// Import User Model
const User = require("../../models/User");
const Task = require("../../models/Task");
const TaskList = require("../../models/TaskList");

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),

    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If info is not correct, sent back a bad request error
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Don't forget anything that returns a promise should have await instead of .then() chain
      await user.save();

      // Saving a user returns the id within the database (user.id)
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign the token, pass in the payload, secret
      // If error throw error, else send back to client
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

//@route  DELETE api/user
//@desc   Delete a user and all associated tasks/lists from the db
//@desc   Private
router.delete("/", auth, async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user.id });
    await TaskList.deleteMany({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });
    res.json({ msg: "All data deleted." });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
