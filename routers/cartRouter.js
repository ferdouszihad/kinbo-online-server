const express = require('express');
const router = express.Router();
const {createCartItem,getCartItem} = require('../controllers/cart.controller');
const authorize = require('../middlewares/authorize');


router.route('/')
.get(authorize,getCartItem)
.post(authorize,createCartItem)




module.exports = router;