const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const TaskList = require("../../models/TaskList");
const User = require("../../models/User");

//@route GET api/taskslist
//@desc Get current user's tasklists
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const tasklist = await await TaskList.findOne({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!tasklist) {
      return res
        .status(400)
        .json({ msg: "There is no tasklist for this user" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error" + err.message);
  }
});

//@route POST api/tasklist
//@desc Create or update a user tasklist
//@access Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, tags, tasks } = req.body;
    const taskListFields = {};
    taskListFields.user = req.user.id;

    if (name) {
      taskListFields.name = name;
    }
    if (description) {
      taskListFields.description = description;
    }
    if (tags) {
      taskListFields.tags = tags.split(",").map((tag) => tag.trim());
    }
    if (tasks) {
      taskListFields.tasks = tasks.split(",").map((task) => task.trim());
    }
    try {
      let tasklist = await TaskList.findOne({ user: req.user.id });

      if (tasklist) {
        // Update
        tasklist = await TaskList.findOneAndUpdate(
          { user: req.user.id },
          { $set: taskListFields },
          { new: true }
        );
        return res.json(tasklist);
      }

      // Create
      tasklist = new TaskList(taskListFields);
      await tasklist.save();
      res.json(tasklist);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
