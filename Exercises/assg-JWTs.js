const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");

const app = express();
const PORT = 5000;

app.use(express.json());

// zod library - Schemas
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

// Function to generate JWT token
const generateToken = (email, password) => {
  const emailValidation = emailSchema.safeParse(email);
  const passwordValidation = passwordSchema.safeParse(password);

  if (!emailValidation.success || !passwordValidation.success) return null;

  // Generate a JWT token
  const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "1h" });
  return token;
};

// Function to decode JWT token
// Decoding a JWT token allows to read the payload and header data encoded within the token without actually verifying that whether it has been tampered or not
const decodeJWT = (token) => {
  try {
    const decoded = jwt.decode(token);
    return !!decoded;
  } catch (error) {
    return false;
  }
};

// Function to verify JWT token
const verifyJWT = (token) => {
  try {
    jwt.verify(token, "your_secret_key");
    return true;
  } catch (error) {
    return false;
  }
};

// POST route to generate JWT token
app.post("/", (req, res) => {
  const { email, password } = req.body;
  const token = generateToken(email, password);

  if (token) {
    res.status(200).json({
      msg: "User data validated successfully",
      token: token,
    });
  } else {
    res.status(400).json({
      msg: "Invalid email or password",
    });
  }
});

// Example usage for decoding and verifying JWT
app.post("/decode", (req, res) => {
  const { token } = req.body;
  const result = decodeJWT(token);
  // result will be in boolena form telling about whether data enclosed with this token can be read or not 
  res.json({ canBeDecoded: result });
});

app.post("/verify", (req, res) => {
  const { token } = req.body;
  const result = verifyJWT(token);
  res.json({ isVerified: result });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
