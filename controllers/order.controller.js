const {Order} = require('../models/order');
const {Cart} = require('../models/cart');
const {Product} =require('../models/product');

module.exports.createOrder = async(req,res) =>{
    const _id = req.user._id;
    const products = await Cart.find({userId:_id})
   .select('productId price quantity');
   

    const order = new Order({
       userId:_id,
       products:products
    })

    console.log('order',order);
    const result = await order.save();
    return res.status(200).send({
        _id:result._id,
        status:true
    })
}


module.exports.getOrderById = async(req,res)=>{
    const _id = req.params.id;
    const result = await Order.findOne({_id:_id})
    .populate('userId','name email')
    const products = result.products;
    const total = products.map(p => p.price*p.quantity);
    const amount = total.reduce((a,b)=>a+b)
    // console.log(amount);
    return res.status(200).send({
        amount,
        userId:result.userId
    })
}