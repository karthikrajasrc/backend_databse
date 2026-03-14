const Auth = require("../Models/authModel");
const bcrypt = require("bcrypt");

const authController = {
    regiterUser: async (req, res) => {
        try {
            const { Name, Email, Password } = req.body;

            const hashedPassword = await bcrypt.hash(Password, 10);

            const AlreadyRegister = await Auth.findOne({ Email });
            console.log(AlreadyRegister);

            if (AlreadyRegister) {
                return res.status(400).json({ message: 'user already exists' })
            }

            const regsiteredUser = new Auth({
                Name, Email, Password: hashedPassword
            });

            const savedUser = await regsiteredUser.save();

            res.status(200).json({ Message: "Registration successfull", user: savedUser });
        }
        catch (error) {
            return res.status(500).json({ Message: "Error found on registration!!" });
        }
    }, 
    loginUser: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            const logged = await Auth.find({ Email });

            if (logged.length == 0) {
                return res.status(500).json({ Message: "User Not found!" });
            }   

            const isPasswordvalid = await bcrypt.compare(Password, logged[0].Password);

            if (!isPasswordvalid) {
                 return res.status(400).json({ message: 'password incorrect' });
            }

            res.status(200).json({ Message: "User Login SuccessFull!!" });

        }
        catch(error) {
             return res.status(500).json({ Message: "Error found on Login!!" });
        }
    }
}

module.exports = authController;