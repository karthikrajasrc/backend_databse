

const express = require("express");
const {getUser} = require("../Controllers/UserController");
const userRouter = express.Router();

userRouter.get("/", getUser)


module.exports = userRouter;