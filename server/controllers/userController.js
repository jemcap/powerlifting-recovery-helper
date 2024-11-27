import expressAsyncHandler from "express-async-handler";
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

  if (!name || !email || !password) {
    return res.status(400).send({ error: "Entry must be complete" });
  }

  const isExistingEntry = await User.find({ email });
  if (isExistingEntry) {
    res.status(400).send({ error: "Entry must be unique" });
  }

  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    if (newUser) {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } else {
      res.status(400);
      throw new Error(error.message);
    }
  } catch (error) {
    next(error);
  }
  // res.status(200).json({ message: "User Registered" });
});

export { authUser, registerUser };
