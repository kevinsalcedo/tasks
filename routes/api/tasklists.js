const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const moment = require("moment");
const mongoose = require("mongoose");

const TaskList = require("../../models/TaskList");
const Task = require("../../models/Task");
const User = require("../../models/User");

//@route GET api/taskslists
//@desc Get current user's tasklists
//@access Private
router.get("/", auth, async (req, res) => {
  console.log("GET taskslist");
  try {
    const lists = await TaskList.find({
      user: req.user.id,
    }).populate("user", ["name"]);

    if (!lists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "You don't have any task lists!" }] });
    }
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. Something went wrong." }] });
  }
});

//@route GET api/tasklists/:list_id
//@desc Get current user's tasklist by list id
//@access Private
router.get("/:list_id", auth, async (req, res) => {
  console.log("GET tasklist");
  try {
    let list = await TaskList.findOne({
      _id: req.params.list_id,
    });

    if (!list) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Oops! You don't have such a list. " }] });
    }

    res.json(list);
  } catch (err) {
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. Something went wrong." }] });
  }
});

//@route POST api/tasklist
//@desc Create a tasklist for a user
//@access Private
router.post(
  "/",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("POST tasklist");

    const { name, description, tags, color } = req.body;
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
    if (color) {
      taskListFields.color = color;
    }
    try {
      // Create
      tasklist = new TaskList(taskListFields);
      await tasklist.save();
      res.json(tasklist);
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json({ errors: [{ msg: "Uh-oh. something went wrong." }] });
    }
  }
);

//@route PUT api/tasklist
//@desc Update a user tasklist
//@access Private
router.put(
  "/:list_id",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("PUT tasklist");

    const { name, description, tags } = req.body;
    const taskListFields = {};
    if (name) {
      taskListFields.name = name;
    }
    if (description) {
      taskListFields.description = description;
    }
    if (tags) {
      taskListFields.tags = tags.split(",").map((tag) => tag.trim());
    }
    if (color) {
      taskListFields.color = color;
    }
    try {
      let list = await TaskList.findOne({
        _id: req.params.list_id,
      });

      if (list) {
        // Update
        list = await TaskList.findOneAndUpdate(
          { user: req.user.id, _id: req.params.list_id },
          { $set: taskListFields },
          { new: true }
        );
        return res.json(list);
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Oops! That list doesn't exist." }] });
      }
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        return res
          .status(400)
          .json({ errors: [{ msg: "Oops! That list doesn't exist." }] });
      }
      return res
        .status(500)
        .json({ errors: [{ msg: "Uh-oh. something went wrong." }] });
    }
  }
);

//@route  DELETE api/tasklist/:list_id
//@desc   Delete a list
//@access Private
router.delete("/:list_id", auth, async (req, res) => {
  try {
    let result = await TaskList.findOneAndDelete({ _id: req.params.list_id });
    // todo - remove all tasks associated with task list
    await Task.deleteMany({ taskList: req.params.list_id });

    res.json({ msg: ` ${result.name} was deleted. Bye-bye list!` });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "oops! That list doesn't exist" }] });
    }
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. Something went wrong." }] });
  }
});

module.exports = router;
