const { Product } = require("../models/product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(400).send("failed");
  }
};

module.exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.status(200).send(product);
};
