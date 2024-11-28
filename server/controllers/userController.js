import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Authenticate user — JWT token
// route    POST /api/users/auth
// @access  Public
const authUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({ message: "User authenticated" });
});

// @desc    Register user
// route    POST /api/users/
// @access  Public
const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // if (!name || !email || !password) {
  //   return res.status(400).send({ error: "Entry must be complete" });
  // }

  try {
    const isExistingEntry = await User.findOne({ email });
    if (isExistingEntry) {
      return res.status(400).send({ error: "Entry must be unique" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    if (newUser) {
      generateToken(res, newUser.id);
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    }
    return res.status(401).send({ error: "Error saving user" });
  } catch (error) {
    next(error);
  }
  // res.status(200).json({ message: "User Registered" });
});

export { authUser, registerUser };
