const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const userRouter = require('./routers/userRouter.js');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');
const isActive = require('./middlewares/isActive');

app.use(morgan('tiny'));
app.use(cors())
app.use(express.json())


app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter)

app.get('/active',isActive)

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send('Server is ok!')
})


module.exports = app;