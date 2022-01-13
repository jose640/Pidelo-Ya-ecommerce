const { check, validationResult, body } = require("express-validator");

let passwordResetValidation = [
    check("password")
        .isLength({
            min: 8
        })
        .withMessage("La contraseña tiene que tener al menos 8 caracteres"),

    check("confirmarPassword")
        .isLength({
            min: 8
        })
        .withMessage("La contraseña tiene que tener al menos 8 caracteres")
]

module.exports = passwordResetValidation;