const server = require("express").Router();

const { validationResult } = require("express-validator");

const { Product, User, Review } = require("../db.js");

const productValidation = require("../validations/productValidation");
const adminMiddleware = require("../middlewares/adminMiddleware");

var multer = require("multer");
const path = require("path");

/* LEVANTAR IMAGEN */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../images/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
});

/////////////////////
///// PRODUCTOS /////
/////////////////////

/* Trae todo el catalogo de productos */
server.get("/", (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(
        "Error por el cual no se pudo traer el catalogo de productos: " + err
      );
    });
});

/* Busca un producto segun la Query */
server.get("/search", (req, res, next) => {
  let query = req.query.query;
  Product.findAll({
    where: {
      nombre: query,
    },
  })
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((err) => {
      console.log("Error por el cual no se pudo buscar un producto: " + err);
    });
});

/* Trae un producto en particular */
server.get("/:id", (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log("Error por el cual no se pudo traer un producto: " + err);
    });
});

/* Crea un producto */

server.post("/", upload.any(), (req, res, next) => {
  console.log(req.files);
  Product.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    imagen: `http://localhost:3001/${req.files[0].originalname}`,
    //req.files[0].originalname
    stock: req.body.stock,
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      console.log("Error por el cual no se pudo crear un producto: " + err);
    });
});


/* Agregar un producto a una categoria - CHECKBOX */
server.post(
  "/:idProducto/category/:idCategoria",
  adminMiddleware.admin,
  (req, res, next) => {
    const { idProducto, idCategoria } = req.params;
    Product.findByPk(idProducto)
      .then((producto) => {
        return producto.addCategories(idCategoria);
      })
      .then((result) => {
        res.send(result);
        console.log("Se agrego el producto a la categoria exitosamente");
      })
      .catch((err) => {
        console.log(
          "Error por el cual no se puede agregar la categoria: " + err
        );
      });
  }
);

/* Sacar categoria de un producto - CHECKBOX */
server.delete(
  "/:idProducto/category/:idCategoria",
  adminMiddleware.admin,
  (req, res, next) => {
    const { idProducto, idCategoria } = req.params;
    Product.findByPk(idProducto)
      .then((producto) => {
        return producto.removeCategories(idCategoria);
      })
      .then((respuesta) => {
        res.send("Se elimino exitosamente");
        console.log("Se elimino el producto de la categoria exitosamente");
      })
      .catch((err) => {
        console.log(
          "Error por el cual no se puede agregar la categoria: " + err
        );
      });
  }
);

/* Elimina un producto en particular */
server.delete("/:id", adminMiddleware.admin, (req, res, next) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.redirect("/products");
      console.log("Se elimino el producto exitosamente");
    })
    .catch((err) => {
      console.log(
        "Error por el cual no se puede eliminar el producto en particular: " +
          err
      );
    });
});

/* Edita un producto en particular */
server.put(
  "/:id",
  adminMiddleware.admin,
  productValidation,
  (req, res, next) => {
    const id = req.params.id;

    let errors = validationResult(req); /* NO ESTA TESTEADO */

    if (errors.isEmpty()) {
      Product.update(
        {
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          precio: req.body.precio,
          imagen: req.body.imagen,
          stock: req.body.stock,
        },
        {
          where: {
            id: id,
          },
        }
      )
        .then(() => {
          return Product.findByPk(id);
        })
        .then((prodActu) => {
          res.send(prodActu);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(errors);
    }
  }
);

//////////////////////
///// Reviews ///////
//////////////////////

//ruta para obtener todas las reviews de un producto
server.get("/:id/review", (req, res) => {
  const { id } = req.params;
  Product.findByPk(id, {
    include: [User],
  }).then((review) => {
    res.json(review);
  });
});

//ruta para agregar  reviews
server.post("/:idProduct/user/:idUser/reviews", async (req, res) => {
  const { descripcion, puntuacion } = req.body;
  const { idProduct, idUser } = req.params;

  /* VALIDACION */

  Review.findAll()
    .then((review) => {
      const result = review.filter(
        (i) =>
          i.productId === parseInt(idProduct) && i.userId === parseInt(idUser)
      );
      return result;
    })
    .then((value) => {
      if (value.length === 0) {
        Product.findByPk(idProduct)
          .then((product) => {
            return product.addUser(idUser, {
              through: {
                descripcion,
                puntuacion,
              },
            });
          })
          .then((e) => {
            res.json(e);
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.json({ error: "error ya existe la review" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//modificar una review
server.put("/:idProduct/user/:idUser", (req, res) => {
  const { idProduct, idUser } = req.params;
  const { puntuacion, descripcion } = req.body;

  /* VALIDACION */

  Review.findAll()
    .then((review) => {
      const result = review.filter(
        (i) =>
          i.productId === parseInt(idProduct) && i.userId === parseInt(idUser)
      );
      return result;
    })
    .then((value) => {
      if (value.length !== 0) {
        Review.update(
          { puntuacion, descripcion },
          { where: { userId: idUser, productId: idProduct } }
        )
          .then(() => {
            res.json({ coma: "mierda gonorrea" });
          })
          .catch((value) => {
            console.log(value);
          });
      } else {
        res.json({ error: "error no existe la review" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

server.delete("/:idProduct/user/:idUser", (req, res) => {
  const { idProduct, idUser } = req.params;

  Review.findAll()
    .then((review) => {
      const result = review.filter(
        (i) =>
          i.productId === parseInt(idProduct) && i.userId === parseInt(idUser)
      );
      return result;
    })
    .then((value) => {
      if (value.length !== 0) {
        Product.findByPk(idProduct)
          .then((produc) => {
            return produc.removeUsers(idUser);
          })
          .then((nose) => {
            res.json(nose);
          });
      } else {
        res.json({ error: "error no existe la review" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = server;
