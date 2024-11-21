const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Stripe = require('stripe')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
const PORT = process.env.PORT || 8000;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});

const cartItemSchema = new mongoose.Schema({
  name: String,
  email:String,
  price: Number,
  quantity: Number,
  total: Number,
  razorpay_payment_id: String,
  // Other cart item details as needed
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

// Route to handle storing cart details
// Route to handle storing cart details
app.post("/store-cart-details", async (req, res) => {
  try {
    const cartItems = req.body.cartItems; // Assuming cartItems is an array of items

    // Save each cart item to the database
    const savedItems = await Promise.all(cartItems.map(async (item) => {
      const { name, price, quantity,total ,razorpay_payment_id} = item;
      const newItem = new CartItem({ name, price, quantity,total,razorpay_payment_id });
      return await newItem.save();
    }));

    res.status(200).json({ message: "Cart details stored successfully", savedItems });
  } catch (error) {
    console.error("Error storing cart details:", error);
    res.status(500).json({ error: "Failed to store" });
  }
});


//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/store-cart-items", async (req, res) => {
  console.log(req.body);
  const { userId, cartItems } = req.body; // Assuming you also have a userId associated with the cart items

  try {
    // Find the user by userId (assuming you have a user model)
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", alert: false });
    }

    // Assuming your user model has a field to store cart items (e.g., cartItems)
    user.cartItems = cartItems;

    await user.save();

    res.status(200).json({ message: "Cart items stored successfully", alert: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email: email }).exec();

      if (user) {
          const dataSend = {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              image: user.image,
          };

          console.log(dataSend);
          return res.json({ message: "Login successful", alert: true, data: dataSend });
      } else {
          return res.status(404).json({ message: "User not found", alert: false });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
  }
});

//product section

const schemaProduct = mongoose.Schema({
  name : String,
  category : String,
  image : String,
  price : String,
  quantity : String,
  farmername : String,
  description : String
})
const productModel = mongoose.model("product",schemaProduct)


//save product in data
app.post("/uploadProduct",async(req,res)=>{
  console.log(req.body)
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "Uploaded successfully"})
})

//
app.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
 
/*****payment getWay */
console.log(process.env.STRIPE_SECRET_KEY)


const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session",async(req,res)=>{

     try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1N0qDnSAq8kJSdzMvlVkJdua"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                  // images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,

      }

      
      const session = await stripe.checkout.sessions.create(params)
      // console.log(session)
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }

})

// Sign up
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match", alert: false });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", alert: false });
    }

    // Create a new user
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
      image,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful", alert: true });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});



//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
