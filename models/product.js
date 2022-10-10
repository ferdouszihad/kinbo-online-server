const {Schema,model} = require('mongoose');

module.exports.Product = model("Product",Schema({
    name:String,
    description:String,
    category:String,
    img:String,
    price:Number,
    quantity:Number
}))