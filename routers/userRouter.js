const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  updateUser,
  getUsers,
} = require("../controllers/user.controller.js");
const authorize = require("../middlewares/authorize");

router.route("/signup").post(signUp);

router.route("/signin").post(signIn);

router.route('/')
.get(getUsers)

router.route("/update").patch(authorize, updateUser);

module.exports = router;
