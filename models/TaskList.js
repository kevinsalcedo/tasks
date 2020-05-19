const mongoose = require("mongoose");
const moment = require("moment");

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
  createDate: {
    type: Date,
    default: moment().utc().format(),
  },
  // TODO: color scheme?
  color: {
    type: String,
    default: "#f44336",
  },
});
module.exports = TaskList = mongoose.model("tasklist", TaskListSchema);
