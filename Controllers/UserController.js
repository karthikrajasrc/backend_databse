const User = require("../Models/userModel")

const userController = {
    getUser: async (req, res) => {
        try {
            const Users = await User.find();

            res.status(200).json(Users)
        }
        catch (error){
            return res.status(500).json({
                message: `fetching user failed: ${error.message}`
            })
        }
    },
    createUser: async (req, res) => {
        try {
            const data = req.body;

            if (Array.isArray(data)) {
                await User.insertMany(data);
            } else {
                await User.create(data);
            }

            res.status(200).json({ data });
        }
        catch (error){
            return res.status(500).json({
                message: `Creation user failed: ${error.message}`
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;

            const { Name, Age } = req.body;

            const updatedUser = await User.findByIdAndUpdate(id, { Name, Age });

            res.status(200).json(updatedUser);
        }
        catch (error){
                return res.status(500).json({
                message: `Creation user failed: ${error.message}`
            })
        }
    }, 
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            await User.findByIdAndDelete(id);
            res.status(200).json({Message: "User Deletion Successfull"})
        }
        catch (error){
            return res.json({Message: `Deletion Not completed ${error.message}`})
        }
    }, 
    getUserbyID: async (req, res) => {
        try {
        const { id } = req.params;

        const userbyID = await User.findById(id);
        
            res.status(200).json( userbyID );
        } 
        catch (error){
            return res.status(500).json({Message: "Could Not find the user!"})
        }
    }
}

module.exports = userController;


 /*    getUser: async (req, res) => {
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
    } */