const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const stripe = require("stripe")(
  "sk_test_51L2CogCzzWb5ebzSQkCpo8JT3wcT3MjJftPju8NNOmkWKuki6W5ILarUW3pFli2GkKXGssXX6Y4U5yJwwMIOuK9t00nCcq6iF4"
);

const userRouter = require("./routers/userRouter.js");
const productRouter = require("./routers/productRouter");
const cartRouter = require("./routers/cartRouter");
const isActive = require("./middlewares/isActive");
const orderRouter = require("./routers/orderRouter");
app.use(morgan("tiny"));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.get("/active", isActive);

// payment intent
app.post("/create-payment-intend", async (req, res) => {
    console.log(req.body);
    let {amount} =  req.body;
//   const price = parseInt(amount)*100;
     amount = amount*100;
     
  try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"]
      });
    
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
     console.log(error);
  }

  
  
});

app.post("/", (req, res) => {
  console.log(req.body.anas);
  res.send("Server is ok!");
});

module.exports = app;
