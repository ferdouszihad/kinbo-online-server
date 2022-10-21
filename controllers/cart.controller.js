const { Cart } = require("../models/cart");
const _ = require("lodash");

module.exports.createCartItem = async (req, res) => {
  const item = await Cart.findOne({
    userId: req.user._id,
    productId: req.body.productId,
  });

  if (item)
    return res.status(400).send({
      status: false,
      message: "Item already added",
    });

  let cartItem = new Cart({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const result = await cartItem.save();
    return res.status(200).send({
      status: true,
      message: "Item added to cart",
    });
  } catch (error) {
    return res.status(400).send({
      status: false,
      message: "Cart insert failed",
    });
  }
};

module.exports.getCartItem = async (req, res) => {
  const cartItems = await Cart.find({ userId: req.user._id })
    .populate("productId", "name img")
    .populate("userId");

  return res.status(200).send(cartItems);
};

module.exports.updateCartItem = async (req, res) => {
   const userId = req.user._id;
   const cartItem = req.body.cart;
   const {_id }= cartItem;
   console.log(userId,cartItem,_id);
   const result = await Cart.updateOne({ _id, userId }, cartItem);
   console.log(result);
   res.status(200).send({
    status: true,
    message: "quantity updated",
  });
};

module.exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;

  await Cart.deleteOne({ _id: id, userId: req.user._id });
  res.status(200).send({
    status: true,
    message: "Item remove",
  });
};
