
const express = require("express");
const userRouter = require("./Routers/userRouter"); 
const app = express();

app.use("/user", userRouter)


module.exports = app;