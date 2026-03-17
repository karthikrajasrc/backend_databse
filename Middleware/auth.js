const Auth = require("../Models/authModel")
const jwt = require("jsonwebtoken");

const auth = {
    isAuthenticated: async (req, res, next) => {
        try {
            const token = req.cookies?.Token;

            if (!token) {
                return res.status(500).json({Message: "No token provided!"})
            }

            const isvalidToken = jwt.verify(token, process.env.JWT_SECRET)

            if (!isvalidToken) {
                return res.status(500).json({ Message: "The token expired and invalid!" });
            }

            req.userID = isvalidToken.id;

            next();
                }
                catch (error) {
                    return res.status(500).json({ Message: "Error found on Token!!" });
                }
    }, allowedRoles: (roles) => {
        return async (req, res, next) => {
            const userId = req.userID;

            const user = await Auth.findById(userId);

            const role = user.Role;

            if (!role.includes(roles)) {
                return res.status(401).json({ Message: "Unauthorized Access!!" });
            }

            next();
        }
    }
}

module.exports = auth;