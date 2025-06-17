let jwt = require('jsonwebtoken')
let constants = require('../utils/constants')
let UserController = require('../controllers/users')

module.exports = {
    check_authentication: async function (req, res, next) {
        try {
            if (!req.headers || !req.headers.authorization) {
                return next(new Error("You are not logged in"));
            }

            let authorization = req.headers.authorization;
            if (authorization.startsWith("Bearer")) {
                let token = authorization.split(" ")[1];
                let decoded = jwt.verify(token, constants.SECRET_KEY);

                if (!decoded || !decoded.id) {
                    return res.status(401).json({ success: false, message: "Invalid token" });
                }

                const user = await UserController.GetUserById(decoded.id);
                if (!user) {
                    return res.status(401).json({ success: false, message: "User not found" });
                }

                req.user = user.get({ plain: true });
                return next();
            } else {
                return next(new Error("Invalid authorization format"));
            }
        } catch (err) {
            return next(err);
        }
    },
    check_authorization: function (requiredRole) {
        return function (req, res, next) {
            let role = req.user.roles.name;
            if (requiredRole.includes(role)) {
                return next();
            } else {
                return res.status(403).json({ message: "You are not authorized to access this resource" });
            }
        }
    }
}