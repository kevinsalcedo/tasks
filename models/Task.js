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
  endDate: {
    type: Date,
  },
  createDate: {
    type: Date,
    default: moment().utc().format(),
  },
  // TODO: subtasks?
  // TODO: index in list?
});

module.exports = Task = mongoose.model("task", TaskSchema);
