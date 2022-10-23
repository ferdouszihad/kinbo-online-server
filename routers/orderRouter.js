const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorize");
const {
  createOrder,
  getOrderById,
  updateOrderById,
  getOrders,
  updateDelivery,
  getOrderDetail,
} = require("../controllers/order.controller");

router.route("/").post(authorize, createOrder)
.get(getOrders);

router.route("/order-detail/:id")
.get(getOrderDetail);

router.route("/:id")
.get(authorize, getOrderById)
.patch(updateOrderById)

router.route("/delivery/:id")
.patch(updateDelivery)


module.exports = router;
