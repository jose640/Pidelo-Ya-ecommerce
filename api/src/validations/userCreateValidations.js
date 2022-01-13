const { check, validationResult, body } = require("express-validator");

let userCreateValidations = [
    check("nombre")
        .isLength({
            min: 2
        })
        .withMessage("El nombre tiene que contener un minimo de 2 caracteres"),

    check("apellido")
        .isLength({
        min: 2
        })
        .withMessage("El apellido tiene que contener un minimo de 2 caracteres"),

    check("email")
        .isEmail()
        .withMessage("El mail debe ser válido"),

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

module.exports = userCreateValidations;