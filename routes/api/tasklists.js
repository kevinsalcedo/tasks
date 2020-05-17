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
      return res.status(400).json({ msg: "You don't have any task lists!" });
    }
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/tasklists/tasks
// @desc Get all user's non-backlog tasks
// @access Private
router.get("/tasks", auth, async (req, res) => {
  console.log("GET all tasks");
  let start = null;
  let end = null;
  if (req.query.start) {
    start = moment(req.query.start).utc();
  }
  if (req.query.end) {
    end = moment(req.query.end).utc();
  }

  let filter = {
    user: req.user.id,
    backlog: false,
  };

  if (start && end) {
    filter = {
      ...filter,
      endDate: { $gte: start, $lte: end },
    };
  }

  try {
    let allTasks = await Task.find(filter)
      .sort({ backlog: 1, endDate: "asc" })
      .populate("taskList", ["name", "color"]);

    res.send(allTasks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error.");
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
        .json({ msg: "Oops! You don't have such a list. " });
    }

    res.json(list);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/tasklists/:list_id/tasks
//@desc Get all tasks for selected task list
//@access Private
router.get("/:list_id/tasks", auth, async (req, res) => {
  console.log("GET tasks for list");
  let start = null;
  let end = null;
  if (req.query.start) {
    start = moment(req.query.start).utc();
  }
  if (req.query.end) {
    end = moment(req.query.end).utc();
  }

  let filter = {
    taskList: req.params.list_id,
    backlog: false,
  };

  if (start && end) {
    filter = { ...filter, createDate: { $gte: start, $lte: end } };
  }

  try {
    let allTasks = await Task.find(filter).populate("taskList", [
      "name",
      "color",
    ]);

    res.send(allTasks);
  } catch (err) {
    console.log(err.message);
    // Throw diifferent error if an invalid id is apsse
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No tasks found." });
    }
    return res.status(500).send("Server Error.");
  }
});

//@route GET api/tasklist/:lid_id/tasks/:task_id
//desc Get a specific task for a tasklist
//@access Private
router.get("/:list_id/tasks/:task_id", auth, async (req, res) => {
  console.log("GET task");
  try {
    let task = await Task.findOne({
      _id: req.params.task_id,
    });
    if (!task) {
      return res.status(400).json({ msg: "That task doesn't exist!" });
    }

    res.send(task);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "That task doesn't exist!" });
    }
    return res.status(500).send("Server Error.");
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
      res.status(500).send("Server Error");
    }
  }
);

//@route POST api/tasklist/:list_id/tasks/
//@desc Create a task in a tasklist
//@access Private
router.post(
  "/:list_id/tasks",
  [auth, [check("name", "A task name is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("POST task");

    const { name, description, startDate, endDate, backlog } = req.body;
    const taskFields = {};
    taskFields.user = req.user.id;

    // Proper way of referencing another document?
    // TODO: validation for if the list exists? Should a new list be created?
    // Currently this can throw an error if the list doesn't exist
    // Probably best idea is to give the user the option to make a new list on frontend,
    // then hit the create list endpoint first. Then pass in that id here
    // let list = TaskList.findOne({user: req.user.id, taskList: taskList});
    // taskFields.taskList = taskList;
    taskFields.taskList = req.params.list_id;
    if (name) {
      taskFields.name = name;
    }
    if (description) {
      taskFields.description = description;
    }
    if (startDate) {
      taskFields.startDate = startDate;
    }
    if (endDate) {
      taskFields.endDate = endDate;
    }
    if (backlog) {
      taskFields.backlog = backlog;
    }
    try {
      // Create
      task = new Task(taskFields);
      await task.save();

      var populatedTask = await task
        .populate("taskList", ["name", "color"])
        .execPopulate();
      res.json(populatedTask);
    } catch (err) {
      console.log(err);
      // Handle if the tasklist is invalid
      return res.status(500).send("Server Error");
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
        return res.status(400).json({ msg: "Oops! That list doesn't exist." });
      }
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "Oops! That list doesn't exist." });
      }
      res.status(500).send("Server Error");
    }
  }
);

//@route PUT api/tasklist/:list_id/tasks/:task_id
//@desc Update a task in a tasklist
//@access Private
router.put(
  "/:list_id/tasks/:task_id",
  [auth, [check("name", "Name is required.").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      taskList,
      name,
      description,
      startDate,
      endDate,
      backlog,
    } = req.body;
    const taskFields = {};
    taskFields.user = req.user.id;

    // Proper way of referencing another document?
    if (taskList) {
      // TODO: validation for if the list exists? Should a new list be created?
      // Currently this can throw an error if the list doesn't exist
      // Probably best idea is to give the user the option to make a new list on frontend,
      // then hit the create list endpoint first. Then pass in that id here
      // let list = TaskList.findOne({user: req.user.id, taskList: taskList});
      // taskFields.taskList = taskList;
      taskFields.taskList = req.params.list_id;
    }
    if (name) {
      taskFields.name = name;
    }
    if (description) {
      taskFields.description = description;
    }
    if (startDate) {
      taskFields.startDate = startDate;
    }
    if (endDate) {
      taskFields.endDate = endDate;
    }
    if (backlog !== null) {
      taskFields.backlog = backlog;
    }

    try {
      let task = await Task.findOne({ _id: req.params.task_id });
      if (!task) {
        return res.status(400).json({ msg: "This task does not exist." });
      }

      task = await Task.findOneAndUpdate(
        { user: req.user.id, _id: req.params.task_id },
        { $set: taskFields },
        { new: true }
      );
      var populatedTask = await task
        .populate("taskList", ["name", "color"])
        .execPopulate();
      return res.json(populatedTask);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "This task does not exist." });
      }
      return res.status(500).send("Server Error.");
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
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "oops! That list doesn't exist" });
    }
    return res.status(500).send("Server Error");
  }
});

//@route  DELETE api/tasks/:list_id/tasks/:task_id
//@desc   Delete a task
//@access Private
router.delete("/:list_id/tasks/:task_id", auth, async (req, res) => {
  try {
    let result = await Task.findOneAndDelete({ _id: req.params.task_id });

    res.json({
      msg: ` ${result.name} was deleted. Bye-bye task!`,
      task: result,
    });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "oops! That task doesn't exist" });
    }
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
