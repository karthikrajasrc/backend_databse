const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "Name": String,
    "Age": Number
});

module.exports = mongoose.model("User", userSchema, "user");