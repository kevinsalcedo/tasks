const mongoose = require("mongoose");

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
  },
  // TODO: subtasks?
  // TODO: index in list?
});

module.exports = Task = mongoose.model("task", TaskSchema);
