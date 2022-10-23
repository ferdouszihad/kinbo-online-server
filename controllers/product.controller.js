const { Product } = require("../models/product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({_id:-1});
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

module.exports.createProduct = async(req,res) =>{
   const product = new Product(req.body);
   const result = await product.save();
   return res.status(200).send({
    status:true
   })
}

module.exports.deleteProduct = async(req,res)=>{
   const id = req.params.id;
   const result = await Product.deleteOne({_id:id});
   return res.status(200).send({
     status:true
   })
}
