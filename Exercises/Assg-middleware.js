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

app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({
      msg: `Number of requests made to the server: ${numberOfRequests}`,
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
