const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

// You have to create a middleware for logging the number of requests on a server

let numberOfRequests = 0;

// This is a global type middleware, logging the number of requests made to the server
app.use((req, res, next) => {
  numberOfRequests += 1;
  // req.numberOfRequests = numberOfRequests;
  next();
});

// Creating a middle warw which might throw an error let's say
// now this will definitely expose the backend or machine which Ain't good though

// To handle this error and to not to expose backend we will
// create a error handling middleware
// If any of the routes throw an error it will handled by this middleware

// 1. First way

const errorMiddleware = (req, res, err) => {
  // If error
  res.status(404).send("<h2>Sorry guys couldn't fullfill your request</h2>");
};

// 2. You can just enclose the errorMiddleware in app.use()

app.get("/error", errorMiddleware, (req, res) => {
  let a;
  console.log(a[1]);
  res.send("<h1>Darshan Choudhary</h1>");
});

app.get("/",(req, res, next) => {
  res.status(200).json({
    msg: `Number of requests made to the server: ${numberOfRequests}`,
  });
});


app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
