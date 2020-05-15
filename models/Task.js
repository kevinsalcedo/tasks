const mongoose = require("mongoose");
const moment = require("moment");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  taskList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasklist",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  startTimeEnabled: {
    type: Boolean,
  },
  endDate: {
    type: Date,
  },
  endTimeEnabled: {
    type: Boolean,
  },
  createDate: {
    type: Date,
    default: moment().utc().format(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // TODO: subtasks?
});

module.exports = Task = mongoose.model("task", TaskSchema);
