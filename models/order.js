const {Schema,model} = require('mongoose');


const orderSchema = Schema({
   userId:{
     type:Schema.Types.ObjectId,
     ref:'User',
     required:true,

   },
   products:[{
     name:String,
     price:Number,
     quantity:Number
   }],
   paid:Boolean,
   amount:Number,
   transactionId:String,
   delivery:{
     type:String,
     default:"pending"
   }

});


module.exports.Order = model('Order',orderSchema);



