

const express = require("express");
const {getUser, createUser, updateUser, deleteUser, getUserbyID} = require("../Controllers/UserController");
const userRouter = express.Router();

userRouter.get("/", getUser)
userRouter.post("/", createUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.get("/:id", getUserbyID)


module.exports = userRouter;