const express = require("express");
const {regiterUser, loginUser, me} = require("../Controllers/authController");
const authRouter = express.Router();

authRouter.post("/register", regiterUser)   
authRouter.post("/login", loginUser)
authRouter.post("/me", me)

module.exports = authRouter;