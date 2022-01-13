const { check, validationResult, body } = require("express-validator");

let userLogInValidations = [
    check("email")
        .isEmail()
        .withMessage("El mail debe ser válido"),

    check("password")
        .isLength({
            min: 8
        })
        .withMessage("La contraseña tiene que tener al menos 8 caracteres"),
]

module.exports = userLogInValidations;