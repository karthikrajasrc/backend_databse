const User = require("../Models/userModel")

const userController = {
    getUser: async (req, res) => {
        try {
            const users = await User.find();

            return res.status(200).json(users);
        }
        catch (error){
            return res.status(500).json({
                message: `fetching all Users failed: ${error.message}`
            })
        }
    }, 
    createUser: async (req, res) => {
        try {
            const data = req.body;

            let savedUser;

            if (Array.isArray(data)) {
                savedUser = await User.insertMany(data);
            } else {
                savedUser = await User.create(data);
            }
                        
            return res.status(200).json({ message: "User created successfully", data: savedUser });
        }
        catch (error){
            return res.status(500).json({
                message: `Creation on User failed: ${error.message}`
            })
        }
    }, 
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const { Name, Age } = req.body;

            const updateUser = await User.findByIdAndUpdate(id, { Name, Age });

            res.status(200).json({ Message: "User Update succesfully", data: updateUser });

        }
        catch (error){
            return res.status(500).json({
                message: `update User failed: ${error.message}`
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await User.findByIdAndDelete(id);

            res.status(200).json({ message: 'user Deletion successful ' })
        }
        catch (error){
            return res.status(500).json({
                message: `Deletion User failed: ${error.message}`
            })
        }
    }
}

module.exports = userController;