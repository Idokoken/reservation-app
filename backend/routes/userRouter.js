const express = require("express");
const {
  registerUser,
  loginUser,
  getOneUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getOneUser);
// userRouter.get("/profile", profile);

module.exports = userRouter;
