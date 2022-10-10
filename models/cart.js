const {Schema,model} = require('mongoose');

module.exports.Cart = model("Cart",Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        requied:true,
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    price:Number,
    quantity:{
        type:Number,
        default:1
    }
}))