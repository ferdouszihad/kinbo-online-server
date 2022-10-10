const { Cart } = require("../models/cart");

module.exports.createCartItem = async (req, res) => {
  const item = await Cart.findOne({userId:req.user._id,productId:req.body.productId})

  if(item) return res.status(400).send('Item already added');


  let cartItem = new Cart({
    ... req.body,
    userId:req.user._id
  });

  console.log(cartItem);
  try {
    const result = await cartItem.save();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send('Cart insert failed');
  }
};

module.exports.getCartItem = async(req,res)=>{
   const cartItems = await Cart.find({userId:req.user._id});
   return res.status(200).send(cartItems);
}

