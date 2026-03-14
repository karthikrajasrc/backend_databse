const express = require("express");
const {regiterUser, loginUser, me} = require("../Controllers/authController");
const { isAuthenticated } = require("../Middleware/auth");
const authRouter = express.Router();

authRouter.post("/register", regiterUser)   
authRouter.post("/login", loginUser)
authRouter.post("/me", isAuthenticated ,me)

module.exports = authRouter;