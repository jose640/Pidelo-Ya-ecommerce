const server = require("express").Router();
const { User, Order, Product, Orderline } = require("../db.js");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");
const adminMiddleware = require("../middlewares/adminMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
const userCreateValidation = require("../validations/userCreateValidations");
const passwordResetValidation = require("../validations/passwordResetValidation");

////////////////////
///// USUARIOS /////
////////////////////

/* Trae todos los Usuarios */
server.get("/", adminMiddleware.admin, (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Trae un usuario en particular
server.get("/:id", userMiddleware.user, (req, res, next) => {
  const { id } = req.params;
  User.findByPk(id).then((user) => {
    if (!user) {
      res.json({ error: "Usuario no existe" });
    } else {
      res.json(user);
    }
  });
});

/* Crea un Usuario */
server.post("/", userCreateValidation, (req, res, next) => {
  let errors = validationResult(req);

  if (errors.isEmpty()) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((response) => {
        if (response == null) {
          User.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: bcrypt.hashSync(req.body.password, 10),
            tipoUsuario: "Cliente",
          }).then(() => {
            console.log("user created");
            res.json(req.session);
          });
        } else {
          console.log("El mail ya esta registrado"); /* MOSTRAR EN EL FRONT */
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log(errors);
  }
});

/* Edita un usuario en particular */
server.put(
  "/:id",
  userMiddleware.user,
  userCreateValidation,
  (req, res, next) => {
    const { id } = req.params;
    User.update(
      {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        contraseña: bcrypt.hashSync(req.body.contraseña, 10),
        tipoUsuario: "Cliente",
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then(() => {
        res.json("El usuario se edito correctamente");
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

/* Password Reset - MAILGUN */
server.post(
  "/:id/passwordReset",
  userMiddleware.user,
  passwordResetValidation,
  (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    User.findOne({
      where: {
        id: id,
      },
    }).then((res) => {
      if (res != null) {
        User.update(
          {
            contraseña: bcrypt.hashSync(password, 10),
          },
          {
            where: {
              id: id,
            },
          }
        ).then(() => {
          console.log("Se edito la contraseña correctamente");
        });
      } else {
        console.log("No se encontro el usuario");
      }
    });
  }
);

/* Elimina un usuario */
server.delete("/:idUser/", adminMiddleware.admin, (req, res, next) => {
  const { idUser } = req.params;
  User.findOne({
    where: {
      id: idUser,
    },
  }).then((res) => {
    console.log(res);
    if (res != null) {
      User.destroy({
        where: {
          id: idUser,
        },
      }).then(() => {
        console.log("Se elimino");
      });
    } else {
      console.log("No se elimino");
    }
  });
});

///////////////////
///// CARRITO /////
///////////////////

/* Trae el Carrito de un Usuario en particular */
server.get("/:id/cart", userMiddleware.user, async (req, res, next) => {
  const { id } = req.params;

  Order.findAll({
    where: {
      userId: id,
      estado: "carrito",
    },
    include: {
      model: Product,
      through: {
        attributes: ["cantidad"],
      },
    },
  })
    .then((carriUser) => {
      res.json(carriUser);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Agregar item al carrito --Funciona-- */
server.post("/:id/product/:idProduct/cart", userMiddleware.user, (req, res) => {
  const { id, idProduct } = req.params;
  const { estado } = req.body;

  User.findByPk(id)
    .then((usuario) => {
      if (!usuario) {
        return res.status(404).json("Usuario no ha sido encontrado");
      }
      Order.findOne({
        where: {
          userId: id,
          estado: "carrito",
        },
      })
        .then(async (orden) => {
          if (!orden) {
            Order.create({
              estado: estado,
              userId: id,
            })
              .then(async (orden) => {
                const product = await Product.findOne({
                  where: { id: idProduct },
                });

                if (!product) {
                  return res.status(404).json("producto no ha sido encontrado");
                }
                const orderline = await orden.addProduct(idProduct, {
                  through: {
                    cantidad: 1,
                    precio: product.precio,
                  },
                });
                return orderline;
              })
              .then((lineaOrden) => {
                res.json(lineaOrden);
              });
          } else {
            const idproducto = await Orderline.findOne({
              where: { productId: idProduct },
            });
            if (idproducto) {
              return res
                .status(400)
                .json("Producto ya esta agregado en el carrito");
            }

            const newproduct = await Product.findOne({
              where: { id: idProduct },
            });

            if (!newproduct) {
              return res.status(404).json("producto no ha sido encontrado");
            }

            const neworderline = await orden.addProduct(idProduct, {
              through: {
                cantidad: 1,
                precio: newproduct.precio,
              },
            });

            return res.json(neworderline);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//eliminar item del Carrito

server.delete("/:idUser/product/:idProduct/cart", (req, res) => {
  const { idUser, idProduct } = req.params;
  User.findByPk(idUser).then((user) => {
    Order.findOne({
      were: {
        userId: idUser,
      },
    }).then((order) => {
      order.removeProduct(idProduct).then((product) => {
        Product.findByPk(idProduct).then((product) => {
          res.json(product);
        });
      });
    });
  });
});

/* Edita carrito */
server.put("/:id/product/:idProduct/cart", userMiddleware.user, (req, res) => {
  const { id, idProduct } = req.params;
  const { cantidad } = req.body;

  User.findByPk(id)
    .then(async (usuario) => {
      if (!usuario) {
        res.status(404).json("Usuario no ha sido encontrado");
      }
      const orden = await Order.findOne({
        where: {
          userId: id,
          estado: "carrito",
        },
      });
      if (!orden) {
        res.status(404).json("carrito no ha sido encontrado");
      }
      const actual = await Orderline.update(
        {
          cantidad: cantidad,
        },
        {
          where: {
            orderId: orden.id,
            productId: idProduct,
          },
        }
      );
    })
    .then(() => {
      console.log("Actualizacion exitosa");
      res.send();
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Elimina el Carrito de un Usuario en particular ---funciona-- */
server.delete("/:id/cart", userMiddleware.user, (req, res, next) => {
  const { id } = req.params;
  Order.destroy({
    where: {
      userId: id,
    },
    include: [Product],
  })
    .then(() => {
      res.json("Se elimino el producto exitosamente");
      console.log("Se elimino el producto exitosamente");
    })
    .catch((err) => {
      console.log(err);
    });
});

///////////////////
///// ORDENES /////
///////////////////

/* Devuelve todas las ordenes de un usuario ---Funcionando---*/
server.get("/:id/orders", userMiddleware.user, (req, res, next) => {
  const { id } = req.params;
  User.findByPk(id)
    .then(async (user) => {
      if (!user) {
        return res.status(404).json("Usuario no ha sido encontrado");
      }
      const orden = await Order.findAll({
        where: {
          userId: id,
        },
        include: [{ model: Product }],
      });

      const ordenes = await orden.filter((elem) => {
        if (elem.estado !== "carrito") return elem;
      });

      return ordenes;
    })
    .then((ordenes) => {
      res.json(ordenes);
      console.log("se encontraron todas las ordenes");
    })
    .catch((err) => {
      console.log(
        "Error por el cual no se puede buscar todas las ordenes: " + err
      );
    });
});

module.exports = server;
