const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const moment = require("moment");

const TaskList = require("../../models/TaskList");
const Task = require("../../models/Task");
const User = require("../../models/User");

//@route GET api/taskslists
//@desc Get current user's tasklists
//@access Private
router.get("/", auth, async (req, res) => {
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
// @desc Get all user's tasks
// @access Private
router.get("/tasks", auth, async (req, res) => {
  try {
    let allTasks = await Task.find({ user: req.user.id }).populate("taskList", [
      "name",
      "color",
    ]);

    allTasks = filterTasks(allTasks, req.query.start, req.query.end);

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
  try {
    let allTasks = await Task.find({
      taskList: req.params.list_id,
    }).populate("taskList", ["name", "color"]);

    allTasks = filterTasks(allTasks, req.query.start, req.query.end);

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

    const { name, description, startDate, endDate } = req.body;
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
    try {
      // Create
      task = new Task(taskFields);
      await task.save();
      res.json(task);
    } catch (err) {
      // Handle if the tasklist is invalid
      return res.status(500).send("Server Error");
    }
  }
);

//@route POST api/tasklist
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
      // taskFields.taskList = taskList;
      taskFields.taskList = req.params._id;
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
      let task = await Task.findOne({ _id: req.params.task_id });
      if (!task) {
        return res.status(400).json({ msg: "This task does not exist." });
      }

      task = await Task.findOneAndUpdate(
        { user: req.user.id, _id: req.params.task_id },
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
router.delete("/tasklist/:list_id/tasks/:task_id", auth, async (req, res) => {
  try {
    let result = await Task.findOneAndDelete({ _id: req.params.task_id });

    res.json({ msg: ` ${result.name} was deleted. Bye-bye task!` });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "oops! That task doesn't exist" });
    }
    return res.status(500).send("Server Error");
  }
});

// Helper method to filter tasks based on the dates specified
const filterTasks = (tasks, start, end) => {
  const startDate = moment(start);
  const endDate = moment(end);

  return tasks.filter((task) => {
    const createDate = moment(task.createDate);
    return (
      createDate.isSameOrBefore(endDate, "days") &&
      createDate.isSameOrAfter(startDate, "days")
    );
  });
};
module.exports = router;
