const server = require("express").Router();
const { Category, Product } = require("../db.js");
const adminMiddleware = require("../middlewares/adminMiddleware")

//////////////////////
///// CATEGORIAS /////
//////////////////////

server.get("/", (req, res, next) => {
  Category.findAll()
    .then((categorias) => {
      res.json(categorias);
    })
    .catch((err) => {
      console.log(
        "Error por el cual no se pudo traer el catalogo de productos: " + err
      );
    });
});

// Devuelve los productos de x categoria
server.get("/:nombreCat", (req, res, next) => {
  const { nombreCat } = req.params;
  Category.findOne({
    where: {
      nombre: nombreCat,
    },
    include: { model: Product },
  })
    .then((c) => {
      res.json(c);
    })
    .then(() => {
      console.log("Los productos se devolvieron satisfatoriamente");
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Crea una Categoria */
server.post("/", adminMiddleware.admin, (req, res, next) => {

  /* VALIDAR LOS DATOS */

  Category.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  })
    .then(() => {
      console.log("La categoria se creo exitosamente");
    })
    .catch((err) => {
      console.log("Error por el cual no se puedo crear la categoria: " + err);
    });
});

/* Edita una categoria en particular */
server.put("/:id", adminMiddleware.admin, (req, res, next) => {

  /* VALIDAR DATOS */

  const id = req.params.id;
  Category.update(
    {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => {
      console.log("Se edito la categoria exitosamente");
    })
    .catch((err) => {
      console.log("Error por el cual no se puede editar la categoria: " + err);
    });
});

/* Elimina una categoria en particular */
server.delete("/:id", adminMiddleware.admin, (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      console.log("Se elimino una categoria exitosamente");
    })
    .catch((err) => {
      console.log(
        "Error por el cual no se puede eliminar una categoria: " + err
      );
    });
});

module.exports = server;