const mongoose = require("mongoose");
const app = require("./app")
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Database has been connected..")
        app.listen(5000, "127.0.0.1", () => {
    console.log("The express server is Running live... http://127.0.0.1:5000")
})
    })
    .catch((error) => {
    console.log("Error in database connection..", error.message)
})