const { check, validationResult, body } = require("express-validator");

let productCreateValidations = [
    check("nombre")
        .isLength({
            min: 3
        })
        .withMessage("El nombre del producto tiene que tener al menos 5 caracteres"),

    check("descripcion")
        .isLength({
        min: 10
        })
        .withMessage("La descripcion del producto tiene que tener al menos 15 caracteres"),

    check("precio")
        .isNumeric()
        .withMessage('El precio debe ser un número'),

    check("stock")
        .isNumeric()
        .withMessage('El stock debe ser un número'),
]

module.exports = productCreateValidations;