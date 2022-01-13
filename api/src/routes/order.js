const server = require("express").Router();
const { Orderline, Order, Product, User } = require("../db.js");

/////////////////////
///// ORDENES /////
/////////////////////

/* Devuelve todas las ordenes */
server.get("/", (req, res) => {
  Order.findAll({
    include: [Product, User],
  })
    .then(async (orders) => {
      const ordenes = await orders.filter((elem) => {
        if (elem.estado !== "carrito") return elem;
      });
      return ordenes;
    })
    .then((ordenes) => {
      res.json(ordenes);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Devuelve una orden en particular */
server.get("/:id", (req, res) => {
  const id = req.params.id;
  Order.findByPk(id, {
    include: { model: Product },
  })
    .then((orden) => {
      if (!orden) {
        res.status(404).json("Orden no ha sido encontrado");
      }

      if (orden.estado !== "carrito") return orden;
    })
    .then((orden) => {
      res.json(orden);
    })
    .catch((err) => {
      console.log("Error por el cual no se pudo traer la orden: " + err);
    });
});

/* Modificar oreden en especifica */
server.put("/:id", async (req, res) => {
  const { id,  } = req.params;
  const { estado } = req.body;

  const ordenes = await Order.findByPk(id);
  if (!ordenes) {
    return res.status(404).json("No se encuentra la orden");
  }

  switch (estado) {
    case "creada":
      Order.findByPk(id)
        .then((orden) => {
          if (orden.estado === "carrito") {
            Order.update(
              {
                estado: estado,
              },
              {
                where: { id: id },
              }
            )
              .then((orden) => {
                 res.json(orden);
              })
              .catch((err) => {
                console.log("Error en la actualizacion del caso creada" + err);
              });
          }
        })
        .catch((err) => {
          console.log("error en la comparacion del caso creada " + err);
        });
      break;

    case "procesando":
      Order.findByPk(id)
        .then((orden) => {
          res.json(orden);
          if (orden.estado === "creada") {
            Order.update(
              {
                estado: estado,
              },
              {
                where: { id: id },
              }
            ).catch((err) => {
              console.log(
                "Error en la actualizacion del caso procesando " + err
              );
            });
          }
        })
        .catch((err) => {
          console.log("error en la comparacion del caso procesando " + err);
        });
      break;

    case "cancelada":
      Order.findByPk(id)
        .then((orden) => {
          res.json(orden);
          if (orden.estado === "creada" || orden.estado === "procesando") {
            Order.update(
              {
                estado: estado,
              },
              {
                where: { id: id },
              }
            ).catch((err) => {
              console.log(
                "Error en la actualizacion del caso procesando " + err
              );
            });
          }
        })
        .catch((err) => {
          console.log("error en la comparacion del caso procesando " + err);
        });
      break;

    case "completa":
      Order.findByPk(id)
        .then((orden) => {
          res.json(orden);
          if (orden.estado === "procesando") {
            Order.update(
              {
                estado: estado,
              },
              {
                where: { id: id },
              }
            ).catch((err) => {
              console.log(
                "Error en la actualizacion del caso procesando " + err
              );
            });
          }
        })
        .catch((err) => {
          console.log("error en la comparacion del caso procesando " + err);
        });
      break;

    default:
      try {
        throw new Error("El estado no coincide");
      } catch (error) {
        console.log(error);
      }
      break;
  }
});

module.exports = server;
