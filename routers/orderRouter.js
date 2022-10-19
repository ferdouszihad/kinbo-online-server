const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const {
  createOrder,
  getOrderById,
} = require("../controllers/order.controller");

router.route("/").post(authorize, createOrder);

router.route("/:id").get(authorize, getOrderById);

module.exports = router;
