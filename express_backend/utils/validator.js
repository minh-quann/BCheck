let { body, validationResult } = require('express-validator');
const { ERROR_EMAIL, ERROR_PASSWORD, ERROR_SIGNIN } = require('./constants');
let util = require('util');
let { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')
let userSchema = require('../models/user');

let options = {
    password: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }
}

module.exports = {
    validate: function (req, res, next) {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            CreateErrorRes(res, 400, errors.array());
        } else {
            next();
        }
    },
    validationSignUp: [
        body("email").isEmail().withMessage(ERROR_EMAIL),
        body("password").isStrongPassword(options.password).withMessage(util.format(
            ERROR_PASSWORD,
            options.password.minLength,
            options.password.minUppercase,
            options.password.minLowercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("role").isIn(["Employee", "Accountant"]).withMessage("Role not valid"),
        body("phone_number")
            .notEmpty().withMessage("Phone number is required")
            .bail()
            .custom(async value => {
                const existingUser = await userSchema.findOne({ where: { phone_number: value } });
                if (existingUser) {
                    throw new Error("Phone number already in use");
                }
                return true;
            })
    ],
    validationCreatedUser: [
        body("email").isEmail().withMessage(ERROR_EMAIL),
        body("password").isStrongPassword(options.password).withMessage(util.format(
            ERROR_PASSWORD,
            options.password.minLength,
            options.password.minUppercase,
            options.password.minLowercase,
            options.password.minNumbers,
            options.password.minSymbols)),
        body("role").isIn(['Admin', 'Mod', 'Employee', 'Accountant']).withMessage("Role not valid"),
    ],
    validationChangePassword: [
        body("newPassword").isStrongPassword(options.password).withMessage(util.format(
            ERROR_PASSWORD,
            options.password.minLength,
            options.password.minUppercase,
            options.password.minLowercase,
            options.password.minNumbers,
            options.password.minSymbols)),
    ],
    validationSignIn: [
        body("email").isEmail().withMessage(ERROR_SIGNIN),
        body("password").isStrongPassword(options.password).withMessage(ERROR_SIGNIN)
    ]
}