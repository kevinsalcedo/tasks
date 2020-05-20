const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const moment = require("moment");
const mongoose = require("mongoose");

const TaskList = require("../../models/TaskList");
const Task = require("../../models/Task");
const User = require("../../models/User");

// @route GET api/tasks
// @desc Get all user's non-backlog tasks
// @access Private
router.get("/", auth, async (req, res) => {
  console.log("GET all tasks");
  let start = null;
  let end = null;
  let backlog = false;
  if (req.query.start) {
    start = moment(req.query.start).utc();
  }
  if (req.query.end) {
    end = moment(req.query.end).utc();
  }
  if (req.query.backlog) {
    backlog = true;
  }

  let filter = {
    user: req.user.id,
    backlog: backlog,
  };

  if (start && end) {
    filter = {
      ...filter,
      endDate: { $gte: start, $lte: end },
    };
  }

  try {
    let allTasks = await Task.find(filter)
      .sort({ endDate: "asc" })
      .populate("taskList", ["name", "color"]);

    res.send(allTasks);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. Something went wrong." }] });
  }
});

//@route GET api/tasks/:task_id
//desc Get a specific task
//@access Private
router.get("/:task_id", auth, async (req, res) => {
  console.log("GET task");
  try {
    let task = await Task.findOne({
      _id: req.params.task_id,
    }).populate("taskList", ["name", "color"]);
    if (!task) {
      return res
        .status(400)
        .json({ errors: [{ msg: "That task doesn't exist!" }] });
    }

    res.send(task);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "That task doesn't exist!" }] });
    }
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. something went wrong." }] });
  }
});

//@route GET api/tasks/:list_id
//@desc Get all tasks for selected task list
//@access Private
router.get("/lists/:list_id", auth, async (req, res) => {
  console.log("GET tasks for list");
  let start = null;
  let end = null;
  let backlog = false;
  if (req.query.start) {
    start = moment(req.query.start).utc();
  }
  if (req.query.end) {
    end = moment(req.query.end).utc();
  }
  if (req.query.backlog) {
    backlog.true;
  }

  let filter = {
    user: req.user.id,
    taskList: req.params.list_id,
    backlog: backlog,
  };

  if (start && end) {
    filter = { ...filter, endDate: { $gte: start, $lte: end } };
  }

  try {
    let allTasks = await Task.find(filter).populate("taskList", [
      "name",
      "color",
    ]);

    res.send(allTasks);
  } catch (err) {
    // Throw diifferent error if an invalid id is apsse
    if (err.kind == "ObjectId") {
      return res.status(400).json({ errors: [{ msg: "No tasks found." }] });
    }
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. something went wrong." }] });
  }
});

//@route POST api/tasks
//@desc Create a task
//@access Private
router.post(
  "/",
  [
    auth,
    [check("name", "A task name is required.").not().isEmpty()],
    check("taskList", "Please select a list").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("POST task");

    const {
      name,
      description,
      taskList,
      startDate,
      endDate,
      backlog,
    } = req.body;
    const taskFields = {};
    taskFields.user = req.user.id;

    // Proper way of referencing another document?
    // TODO: validation for if the list exists? Should a new list be created?
    // Currently this can throw an error if the list doesn't exist
    // Probably best idea is to give the user the option to make a new list on frontend,
    // then hit the create list endpoint first. Then pass in that id here
    // let list = TaskList.findOne({user: req.user.id, taskList: taskList});
    taskFields.taskList = taskList;
    // taskFields.taskList = req.params.list_id;
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
      return res
        .status(500)
        .json({ errors: [{ msg: "Uh-oh. something went wrong." }] });
    }
  }
);

//@route PUT api/tasks/:task_id
//@desc Update a task in a tasklist
//@access Private
router.put("/:task_id", [auth], async (req, res) => {
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
    completed,
  } = req.body;
  const taskFields = {};
  const updatedFields = {};
  taskFields.user = req.user.id;

  // Proper way of referencing another document?
  if (taskList) {
    // TODO: validation for if the list exists? Should a new list be created?
    // Currently this can throw an error if the list doesn't exist
    // Probably best idea is to give the user the option to make a new list on frontend,
    // then hit the create list endpoint first. Then pass in that id here
    // let list = TaskList.findOne({user: req.user.id, taskList: taskList});
    taskFields.taskList = taskList;
    //   taskFields.taskList = req.params.list_id;
    updatedFields.listChanged = true;
  }
  if (name) {
    taskFields.name = name;
    updatedFields.nameChanged = true;
  }
  if (description) {
    taskFields.description = description;
    updatedFields.descriptionChanged = true;
  }
  if (startDate) {
    taskFields.startDate = startDate;
    updatedFields.startDateChanged = true;
  }
  if (endDate) {
    taskFields.endDate = endDate;
    updatedFields.endDateChanged = true;
  }
  if (backlog !== undefined) {
    taskFields.backlog = backlog;
    updatedFields.backlogChanged = true;
  }

  if (completed !== undefined) {
    taskFields.completed = completed;
    updatedFields.completedChanged = true;
  }

  try {
    let task = await Task.findOne({ _id: req.params.task_id });
    if (!task) {
      return res
        .status(400)
        .json({ errors: [{ msg: "This task does not exist." }] });
    }

    task = await Task.findOneAndUpdate(
      { user: req.user.id, _id: req.params.task_id },
      { $set: taskFields },
      { new: true }
    );
    var populatedTask = await task
      .populate("taskList", ["name", "color"])
      .execPopulate();
    return res.json({
      task: populatedTask,
      updatedFields,
    });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "This task does not exist." }] });
    }
    return res
      .status(500)
      .json({ errors: [{ msg: "uh-oh. something went wrong." }] });
  }
});

//@route  DELETE api/tasks/:task_id
//@desc   Delete a task
//@access Private
router.delete("/:task_id", auth, async (req, res) => {
  try {
    let result = await Task.findOneAndDelete({ _id: req.params.task_id });

    res.json({
      msg: ` ${result.name} was deleted. Bye-bye task!`,
      task: result,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res
        .status(400)
        .json({ errors: [{ msg: "oops! That task doesn't exist" }] });
    }
    return res
      .status(500)
      .json({ errors: [{ msg: "Uh-oh. something went wrong." }] });
  }
});

module.exports = router;
