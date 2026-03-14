const auth = require("../Models/authModel");
const bcrypt = require("bcrypt");

const authController = {
    regiterUser: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;

            const hasedPassword = await bcrypt.hash(Password, 10);

            const regsiteredUser = {
                Name, Email, Password: hasedPassword
            };

            const savedUser = await auth.create(regsiteredUser);

            res.status(200).json({ Message: "Registration successfull", user: savedUser });
        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on registration!!" });
        }
    }, 
     loginUser: async (req, res) => {
        res.json({ Message: "Login successfll"})
    }
}

module.exports = authController;