
const express = require("express");
const userRouter = require("./Routers/userRouter"); 
const authRouter = require("./Routers/authRouter");
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter)
app.use("/auth", authRouter)


module.exports = app;