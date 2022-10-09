const express = require('express');
const morgan = require('morgan');
const app = express();
const userRouter = require('./routers/userRouter.js');

app.use(morgan('tiny'));
app.use(express.json())

app.use('/api/user',userRouter)

app.post('/',(req,res)=>{
    console.log(req.body);
    res.send('Server is ok!')
})


module.exports = app;