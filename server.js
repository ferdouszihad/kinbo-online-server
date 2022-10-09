const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=> console.log('connected'))
.catch(err => console.log(err))


const port = 8000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})