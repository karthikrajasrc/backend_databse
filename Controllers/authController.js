const Auth = require("../Models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const authController = {
    regiterUser: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;

            const alreadyRegister = await Auth.findOne({ Email });

            if (alreadyRegister) {
            return res.status(500).json({ Message: "User Already exists" });
            }

            let hasPassword = await bcrypt.hash(Password, 10);

            const user = new Auth({
                Name, Email, Password: hasPassword
            })

            const registerUser = await user.save();
            console.log(registerUser);

            return res.status(200).json({ Message: "User Registered SuccessFully", user: registerUser });
        }
        catch (error) {
            return res.status(500).json({ Message: "Registration Failed!" });
        }
    }, 
    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            const loggeduser = await Auth.find({ Email });
            if (loggeduser.length == 0) {
                return res.status(500).json({ Message: "No user Found! Please Register.." });
            }

            const isCorrectpass = await bcrypt.compare(Password, loggeduser[0].Password);

            if (!isCorrectpass) {
                return res.status(500).json({ Message: "Password Invalid!" });
            }

            const token = await jwt.sign({ id: loggeduser[0]._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

            res.cookie("Token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict"
            })
            

            return res.status(200).json({ Message: "Login SuccessFull", User: loggeduser });

        }
        catch(error) {
             return res.status(500).json({ Message: "Error found on Login!!" });
        }
    },
    me: async (req, res) => {
        try {
            const userid = req.userID;
            
            const user = await Auth.findById(userid);

            return res.status(200).json({ Message: "User Logged in", user: user });

        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on Login!!" });
        }
    }
}

module.exports = authController;