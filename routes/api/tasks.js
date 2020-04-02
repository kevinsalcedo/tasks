const express = require("express");
const router = express.Router();

//@route GET api/tasks
//@desc Tasks route
//@access Public
router.get("/", (req, res) => res.send("Tasks route"));

module.exports = router;
