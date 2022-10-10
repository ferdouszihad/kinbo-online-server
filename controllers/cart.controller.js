const { Cart } = require("../models/cart");
const _ = require('lodash');

module.exports.createCartItem = async (req, res) => {
  const item = await Cart.findOne({userId:req.user._id,productId:req.body.productId})

  if(item) return res.status(400).send({
    status:false,
    message:"Item already added"
  });

  console.log('request',req.body);
  let cartItem = new Cart({
    ... req.body,
    userId:req.user._id
  });

  console.log(cartItem);
  try {
    const result = await cartItem.save();
    return res.status(200).send({
      status:true,
      message:"Item added to cart"
    });
  } catch (error) {
    return res.status(400).send({
      status:false,
      message:"Cart insert failed"
    });
  }
};

module.exports.getCartItem = async(req,res)=>{
   const cartItems = await Cart.find({userId:req.user._id})
   .populate('productId','name img')
  
   return res.status(200).send(cartItems);
}

module.exports.updateCartItem = async(req,res) =>{
   console.log('body',req.body);
   const {_id,quantity} = _.pick(req.body,["_id","quantity"]);
   console.log(_id,quantity);
   const userId = req.user._id;
   console.log('user',userId);
   const result = await Cart.updateOne({_id,userId},{quantity})
   res.status(200).send({
    status:true,
    message:"quantity updated"
   })
}


module.exports.deleteCartItem = async(req,res)=>{
    const {id} = req.params;
    console.log('Anas',id);
    await Cart.deleteOne({_id:id,userId:req.user._id});
    res.status(200).send({
      status:true,
      message:"Item remove"
    })
}
