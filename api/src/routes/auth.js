const server = require("express").Router();
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const userLoginValidation = require("../validations/userLogInValidation");
const adminMiddleware = require("../middlewares/adminMiddleware")

////////////////
///// AUTH /////
////////////////

server.get("/login", (req, res, next) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

/* Login */
server.post("/login", userLoginValidation, (req, res, next) => {

    let errors = validationResult(req);

    if (errors.isEmpty()) {
        const { email } = req.body;
        var usuario;
        User.findOne({
            where: {
                email: email,
            }
        })
        .then((response) => {
            usuario = response;

            if(usuario != null) {
                usuario = usuario.dataValues;
                if(bcrypt.compareSync(req.body.password, usuario.contraseña)) {
                    req.session.user = usuario
                    console.log("Accediste!")
                    console.log(req.session)
                    res.json(req.session)
                } else {
                    console.log("La contraseña es invalida") //MOSTRAR MENSAJE DE ERROR EN EL FRONT
                }
            } else {
                console.log("Este mail no esta registrado") //MOSTRAR MENSAJE DE ERROR EN EL FRONT - REDIRIGIR A CREATEACCOUNT?
            }
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        console.log(errors)
    }
})

/* Logout */
server.post("/logout", (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
          return res.redirect('/');
        }
        res.clearCookie('sid');
        console.log("Elimino la session")
        res.redirect("/")
    })
})

/* Ascender a Administrador */
server.put("/promote/:userId", (req, res, next) => {
    const { userId } = req.params;
    var usuario;
    User.update({
        tipoUsuario: "Admin"
    },
    {
        where: {
            id: userId,
        }
    })
    User.findByPk(userId)
        .then(response => {
            usuario = response;
            console.log(usuario)
            if(usuario != null) {
                usuario = usuario.dataValues;
                req.session.user = usuario
                console.log(req.session.user)
            }
        })
    /* Sino, no renderiza */

    .catch((err) => {
      console.log(err);
    });
});

/* Devuelve el Usuario que esta Loggeado */
server.get("/me", (req, res, next) => {
    res.send(req.session.user)
})

module.exports = server;
