const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
 const OrderLine = sequelize.define("orderline", {
    numorden: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
