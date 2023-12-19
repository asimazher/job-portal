const express = require("express");
const {
  addUser,
  loginUser,
  resetPassword,
  forgotPassword,
  verifyUser,
  createUser,
  setPassword,
} = require("../controllers/user");
const userRouter = express.Router();

// Register User

userRouter.post("/createUser", createUser);

userRouter.post("/setPassword/:token", setPassword);

userRouter.post("/login", loginUser);

userRouter.post("/forgot-password", forgotPassword);

userRouter.post("/reset-password/:token", resetPassword);

module.exports = userRouter;
