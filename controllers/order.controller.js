const { Order } = require("../models/order");
const { Cart } = require("../models/cart");
const { Product } = require("../models/product");

module.exports.createOrder = async (req, res) => {
  const _id = req.user._id;
  const products = await Cart.find({ userId: _id }).select(
    "productId price quantity"
  );
  
  const order = new Order({
    userId: _id,
    products: products,
  });
  const cart = await Cart.deleteMany({userId:_id});

  const result = await order.save();
  return res.status(200).send({
    _id: result._id,
    status: true,
  });
};

module.exports.getOrderById = async (req, res) => {
  const _id = req.params.id;
  const result = await Order.findOne({ _id: _id }).populate(
    "userId",
    "name email"
  );
  const products = result.products;
  const total = products.map((p) => p.price * p.quantity);
  const amount = total.reduce((a, b) => a + b);

  return res.status(200).send({
    amount,
    userId: result.userId,
  });
};

module.exports.updateOrderById = async(req,res)=>{
   const {id} = req.params;
   const {userId} = req.body;
   console.log(userId);
 
   const result = await Order.updateOne({_id:id,userId:userId._id},req.body);
   console.log(result);
}


module.exports.getOrders = async(req,res) =>{
   const result = await Order.find().sort({_id:-1});
   res.status(200).send(result);
}

module.exports.updateDelivery = async(req,res)=>{
   const {id} = req.params;
   const result = await Order.updateOne({_id:id},req.body);
   res.status(200).send({
     status:true
   })
}


module.exports.getOrderDetail = async(req,res) =>{
   const {id} = req.params;
   const result = await Order.findOne({_id:id});
   res.status(200).send(result)
}