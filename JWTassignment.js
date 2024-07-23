const express = require("express");
const jwt = require("jsonwebtoken");
// A jwt password
const jwtPassword = "123456";

const app = express();
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "Harkirat Singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman Singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya Kumari",
  },
];

function userExists(username, password) {
  const filterArr = ALL_USERS.filter(
    (user) => user.password === password && user.username == username
  );
  return filterArr.length > 0;
}

app.post("/signin", function (req, res) {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in-memory DB",
    });
  }

  // Generation of jwt token
  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    // Return a list of users other than the one making the request
    const users = ALL_USERS.filter(user => user.username !== decoded.username);
    return res.json(users);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
