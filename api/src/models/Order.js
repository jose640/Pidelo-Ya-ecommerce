const { DataTypes, or } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const Order = sequelize.define("order", {
    estado: {
      type: DataTypes.STRING,
      defaultValue: "carrito",
    },
  });
};

/* Esto renderiza el carrito */
