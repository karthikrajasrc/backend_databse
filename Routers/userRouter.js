

const express = require("express");
const {getUser, createUser, updateUser, deleteUser} = require("../Controllers/UserController");
const userRouter = express.Router();

userRouter.get("/", getUser)
userRouter.post("/", createUser)
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)


module.exports = userRouter;