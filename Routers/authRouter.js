const express = require("express");
const {regiterUser, loginUser} = require("../Controllers/authController");
const authRouter = express.Router();

authRouter.post("/register", regiterUser)   
authRouter.post("/login", loginUser)

module.exports = authRouter;