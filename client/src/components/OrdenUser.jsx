import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerOrdenes } from "../redux/actions";
import { useParams } from "react-router-dom";
import "./UsuarioRegistro.sass";

export const OrdenUser = () => {
  var id = useParams().id;

  const dispatch = useDispatch();
  const ordenes = useSelector((store) => store.ordenes.ordenes);

  useEffect(() => {
    dispatch(obtenerOrdenes(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //arrayOrdenes aloja las ordenes del usuario en un array, junto con su estado, y sus productos
  //los productos estan tambien en un array, con su precio, y cantidad
  var arrayOrdenes = ordenes ? (
    ordenes
      .map((orden) => {
        return [
          orden.id,
          orden.estado,
          orden.products.map((productsItems) => {
            return [
              productsItems.nombre,
              productsItems.orderline.cantidad,
              productsItems.precio,
            ];
          }),
        ];
      })
      .filter((orden) => {
        return orden[1] !== "cancelada";
      })
  ) : (
    <span>No hay productos</span>
  );

  function listarProductos(indexOrden) {
    return arrayOrdenes[indexOrden]
      ? arrayOrdenes[indexOrden][2].map((e) => {
          return <li>{e[0]}</li>;
        })
      : ["falló filtro o usuario no tiene ordenes en el historial"];
  }

  function listar(indexOrden, queListar) {
    switch (queListar) {
      case "precios":
        return arrayOrdenes[indexOrden]
          ? arrayOrdenes[indexOrden][2].map((e) => {
              return (
                <li>
                  $ {e[2]} {/*precio*/}
                </li>
              );
            })
          : ["falló filtro o usuario no tiene ordenes en el historial"];

      case "cantidad":
        return arrayOrdenes[indexOrden]
          ? arrayOrdenes[indexOrden][2].map((e) => {
              return (
                <li key={`${arrayOrdenes[indexOrden][2].indexOf(e)}`}>
                  {e[1]}
                  {/*cantidad*/}
                </li>
              );
            })
          : ["falló filtro o usuario no tiene ordenes en el historial"];

      default:
        return "error";
    }
  }
  function precioTotal(arrayProductos) {
    var total = 0;
    arrayProductos.map((producto) => {
      return (total += producto[2] * producto[1]);
    });

    return total;
  }

  return (
    <div className="historialOrdenes overflow">
      <h3 className="  font-italic- font-weight-normal text-center text-primary">
        BIENVENIDO A TU HISTORIAL DE PEDIDOS
      </h3>
      <div>
        {arrayOrdenes
          ? arrayOrdenes.map((e) => {
              var indexActual = arrayOrdenes.indexOf(e);
              return (
                <div
                  className="container text-center column border border-dark rounded mt-5 p-3"
                  style={{ backgroundColor: "rgba(100,100,100, 0.2)" }}
                >
                  <h3>ORDEN</h3>
                  {/*id de orden*/}
                  <h5>
                    {arrayOrdenes[0] ? (
                      `ID: ${arrayOrdenes[indexActual][0]}`
                    ) : (
                      <div className="text-danger">ORDEN NO ENCONTRADA</div>
                    )}
                  </h5>
                  {/* estado de orden */}
                  <h5>
                    {arrayOrdenes[0] ? (
                      `Estado: ${arrayOrdenes[indexActual][1]}`
                    ) : (
                      <div className="text-danger">ESTADO NO ENCONTRADO</div>
                    )}
                  </h5>
                  <br></br>

                  <div className="row justify-content-around ">
                    {/* {columna productos} */}
                    <div className="column">
                      <h5 className="border-bottom"> Productos </h5>
                      <ul className="list-unstyled text-capitalize">
                        {listarProductos(indexActual)}
                      </ul>
                    </div>
                    {/* {columna precios} */}
                    <div className="column">
                      <h5 className="border-bottom"> Valor </h5>
                      <ul className="list-unstyled text-capitalize">
                        {listar(indexActual, "precios")}
                      </ul>
                    </div>
                    {/* {columna cantidad} */}
                    <div className="column">
                      <h5 className="border-bottom"> Cantidad </h5>
                      <ul className="list-unstyled text-capitalize">
                        {listar(indexActual, "cantidad")}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <strong> TOTAL: ${precioTotal(e[2])} </strong>
                    {e[1] === "creada" ? (
                      <button className="bg-dark text-warning float-right">
                        CANCELAR ORDEN
                      </button>
                    ) : null}
                  </div>
                  <div></div>
                </div>
              );
            })
          : "no"}{" "}
      </div>
    </div>
  );
};
