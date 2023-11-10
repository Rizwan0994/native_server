// controllers/authController.js
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendEmail = require('../utils/sendEmail')

const secretKey = process.env.SECRET_KEY;

// Signup controller
exports.signup = async (req, res) => {
  const { name , email, password } = req.body;
  console.log(email +" "+password )
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);
   res.json({ user, token });
};



exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
const pass = 'Abcd!234'
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  user.password = await bcrypt.hash(pass, 10);
  await user.save();
    await sendEmail(user.email, pass);
    res
      .status(200)
      .json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

