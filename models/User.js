const mongoose = require("mongoose");
const moment = require("moment");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: moment().utc().format(),
  },
});

module.exports = User = mongoose.model("user", UserSchema);
