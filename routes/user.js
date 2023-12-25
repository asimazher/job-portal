const express = require("express");
const {
  loginUser,
  resetPassword,
  forgotPassword,
  createUser,
  setPassword,
  changePassword,
} = require("../controllers/user");
const userRouter = express.Router();

// Register User

userRouter.post("/createUser", createUser);

// userRouter.post("/setPassword/:token", setPassword);
userRouter.patch("/setPassword/:token?", resetPassword);


userRouter.post("/login", loginUser);

userRouter.post("/forgot-password", forgotPassword);

userRouter.patch("/reset-password/:token?", resetPassword);

userRouter.patch("/change-password/:token?", changePassword);

module.exports = userRouter;
