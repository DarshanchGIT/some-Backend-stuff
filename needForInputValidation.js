// To use nodemon -> insert a start script as npm run dev in pckg json
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start": "node needForInputValidation.js",
//     "dev": "nodemon needForInputValidation.js"
//   },
const express = require("express");
//creating a instnace
const app = express();
//import zod from zod
const zod = require("zod");
//defining a port
const PORT = process.env.PORT || 3000;

app.use(express.json());

//creating a schema for ZOD
const schema = zod.array(zod.number());

app.post("/", (req, res) => {
  //acquiring a body by user
  const userData = req.body.kidneys;
  const response = schema.safeParse(userData);

  // const userDataLength = userData.length;

  res.send(response);
});

// GLOBAL CATCHES

//defining a global catch basically if any of the above defined routes or middlewares were to behave unexpectedly, control would reach here

app.use((err, req, res, next) => {
  res.json({
    msg: "Error occurred !!",
  });
});

app.listen(PORT, () => {
  console.log("Server listened on ${PORT}");
});
