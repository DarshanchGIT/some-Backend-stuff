const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;

// Connect to your database
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://admin:<password>@cluster0.lhcugcv.mongodb.net/userSignup?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB successfully !!"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Create a new user instance
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const userPassword = req.body.password;
  const userEmail = req.body.email;
  const user = new User({
    name: username,
    email: userEmail,
    password: userPassword,
  });
  // Save the user to the database
  user
    .save()
    .then(() => {
      console.log("User saved");
      res.json({
        msg: "User has been created in the database",
      });
    })
    .catch((err) => {
      console.error("Could not save user", err);
      res.status(500).json({
        error: "Could not save user",
      });
    });
});
//listen the app
app.listen(PORT, () => console.log(`App listening on ${PORT}`));
