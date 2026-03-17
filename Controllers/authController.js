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
                return res.status(500).json({Message: "User Already Exists!!"})
            }



            const hasedPassword = await bcrypt.hash(Password, 10);

            const newUser = new Auth({
                Name, Email, Password: hasedPassword
            })

            const userRole = await Auth.find();

            if (userRole.length == 0) {
                newUser.Role = "Admin";
            }

            const saveduser = await newUser.save();

            return res.status(200).json({ Message: "User Regsitered Succesfully !", User: saveduser });

        }
        catch (error) {
            return res.status(500).json({ Message: "Registration Failed!", Error: error.Message });
        }
    }, 
    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            const loggedUser = await Auth.find({ Email });

            if (loggedUser.length == 0) {
                return res.status(500).json({ Message: "No user Found!! Please register.." });
            }

            const isPasswordvalid = await bcrypt.compare(Password, loggedUser[0].Password);

            if (!isPasswordvalid) {
                return res.status(500).json({ Message: "Password Incorrect" });
            }

            const token = await jwt.sign({ id: loggedUser[0]._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

            res.cookie("Token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict"
            });

            return res.status(200).json({ Message: "User logined in Successfully!", User: loggedUser });

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
    },
    logoutUser: async (req, res) => {
        try {
            res.clearCookie("Token");
            return res.status(200).json({ Message: "User Logged out Successfully!" });
        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on Logout!!" });
        }
    }
}

module.exports = authController;