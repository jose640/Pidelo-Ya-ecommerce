const { check, validationResult, body } = require("express-validator");

let categoryValidation = [
    check("nombre")
        .isLength({
            min: 5
        })
        .withMessage("El nombre del producto tiene que tener al menos 5 caracteres"),

    check("descripcion")
        .isLength({
        min: 15
        })
        .withMessage("La descripcion del producto tiene que tener al menos 15 caracteres"),
]

module.exports = categoryValidation;