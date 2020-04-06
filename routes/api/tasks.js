const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Task = require("../../models/Task");
const TaskList = require("../../models/TaskList");

//@route    GET api/tasks
//@desc     Get every task for a user
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    let allTasks = await Task.find({
      user: req.user.id,
    }).populate("taskList", ["name"]);

    if (!allTasks) {
      return res.status(400).json({ msg: "No tasks found." });
    }
    res.send(allTasks);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error.");
  }
});

//@route    GET api/tasks/:list_id
//@desc     Get every task within a tasklist for a user
//@access   Private
router.get("/lists/:list_id", auth, async (req, res) => {
  try {
    let allTasks = await Task.find({
      taskList: req.params.list_id,
    }).populate("taskList", ["name"]);

    if (!allTasks) {
      return res.status(400).json({ msg: "No tasks found." });
    }
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

//@route    GET api/tasks/:task_id
//@desc     Get a specific task within a list
//@access   Private
router.get("/:task_id", auth, async (req, res) => {
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

//@route    POST api/tasks/
//@desc     Create a task
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("taskList").exists(),
      check("name", "A task name is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskList, name, description, startDate, endDate } = req.body;
    const taskFields = {};
    taskFields.user = req.user.id;

    // Proper way of referencing another document?
    if (taskList) {
      // TODO: validation for if the list exists? Should a new list be created?
      // Currently this can throw an error if the list doesn't exist
      // Probably best idea is to give the user the option to make a new list on frontend,
      // then hit the create list endpoint first. Then pass in that id here
      // let list = TaskList.findOne({user: req.user.id, taskList: taskList});
      taskFields.taskList = taskList;
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

    try {
      // Create
      task = new Task(taskFields);
      await task.save();
      res.json(task);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

router.put(
  "/:task_id",
  [
    auth,
    [
      check("name", "Name is required.").not().isEmpty(),
      check("taskList", "A valid task list is required.").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { taskList, name, description, startDate, endDate } = req.body;
    const taskFields = {};
    taskFields.user = req.user.id;

    // Proper way of referencing another document?
    if (taskList) {
      // TODO: validation for if the list exists? Should a new list be created?
      // Currently this can throw an error if the list doesn't exist
      // Probably best idea is to give the user the option to make a new list on frontend,
      // then hit the create list endpoint first. Then pass in that id here
      // let list = TaskList.findOne({user: req.user.id, taskList: taskList});
      taskFields.taskList = taskList;
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

    try {
      let task = Task.findOne({ user: req.user.id, task: req.params.task_id });

      if (!task) {
        return res.status(400).json({ msg: "This task does not exist." });
      }

      task = await Task.findOneAndUpdate(
        { user: req.user.id },
        { $set: taskFields },
        { new: true }
      );
      return res.json(task);
    } catch (err) {
      console.log(err.message);
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "This task does not exist." });
      }
      return res.status(500).send("Server Error.");
    }
  }
);

module.exports = router;
