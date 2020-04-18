const mongoose = require("mongoose");

const TaskListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // todo: tags object?
  tags: {
    type: [String],
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  // TODO: color scheme?
  color: {
    type: String,
    default: "#71EEB8",
  },
});

module.exports = TaskList = mongoose.model("tasklist", TaskListSchema);
