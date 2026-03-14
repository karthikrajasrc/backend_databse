const Auth = require("../Models/authModel")
const jwt = require("jsonwebtoken");

const auth = {
    isAuthenticated: async (req, res, next) => {
        try {
            const token = req.cookies.Token;
            const validToken = await jwt.verify(token, process.env.JWT_SECRET);

            if (!validToken) {
                return res.status(500).json({Message: "Token is Invalid"})
            }

            req.userID = validToken.id;

            next();

                }
                catch (error) {
                    return res.status(500).json({ Message: "Error found on Token!!" });
                }
    }
}

module.exports = auth;