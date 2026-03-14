const Auth = require("../Models/authModel")
const jwt = require("jsonwebtoken");

const auth = {
    isAuthenticated: async (req, res, next) => {
        try {
                    const token = req.cookies?.Token;
                    
                    if (!token) {
                        return res.status(500).json({ Message: "No token found!" });
                    }
        
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                   
                    if (!decoded) {
                        return res.status(500).json({ Message: "Invalid Token" });
                    }
        
                req.userID = decoded.id;
                    
            next();
        
                }
                catch (error) {
                    return res.status(500).json({ Message: "Error found on Login!!" });
                }
    }
}

module.exports = auth;