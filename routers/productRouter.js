const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.route("/")
.get(getProducts)
.post(createProduct)


router.route("/:id")
.get(getProductById)
.delete(deleteProduct)


module.exports = router;
