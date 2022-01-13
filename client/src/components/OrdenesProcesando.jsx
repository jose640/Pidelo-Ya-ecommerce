import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerTotalOrdenes,
  editarTodasOrdenes,
  ejecutarMailGun,
} from "../redux/actions";

import "./FormCrud.sass";

export const OrdenesProcesando = () => {
  const dispatch = useDispatch();
  const ordenes = useSelector((store) => store.ordenes.totalOrdenes);
  const arrayOrdenesCreadas = ordenes
    ? ordenes.filter((orden) => orden.estado === "procesando")
    : "No busco nada";

  const precioTotal = (productos) => {
    let total = 0;
    productos.map((elem) => (total += elem.precio * elem.orderline.cantidad));

    return total;
  };

  const cancelarOrder = (id) => {
    dispatch(editarTodasOrdenes(id, "cancelada"));
    window.location.reload();
  };

  const completarOrder = (id) => {
    dispatch(editarTodasOrdenes(id, "completa"));
    dispatch(
      ejecutarMailGun({
        message: "Tu orden está en camino. Gracias por elegirnos!",
      })
    );
    window.location.reload();
  };

  useEffect(() => {
    dispatch(obtenerTotalOrdenes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="orden">
      <div className="p-5">
        {arrayOrdenesCreadas
          ? arrayOrdenesCreadas.map((elem) => {
              return (
                <div
                  className="container text-center border border-dark rounded mt-5 p-3"
                  key={elem.id}
                >
                  <div className="bg-dark text-white">
                    <h2>
                      {elem.user.nombre} {elem.user.apellido}
                    </h2>
                  </div>
                  <br></br>
                  <div className="row justify-content-around">
                    <div className="col-11 font-weight-bold">
                      {" "}
                      <h3>ORDEN {elem.id}</h3>{" "}
                    </div>
                    <div className="flex-row-reverse">
                      {" "}
                      <h5>{elem.estado}</h5>
                    </div>
                  </div>
                  <br></br>
                  <div className="row justify-content-around ">
                    {/* {columna productos} */}
                    <div className="column">
                      <h5 className="border-bottom font-weight-bold">
                        {" "}
                        Productos{" "}
                      </h5>
                      <ul className="list-unstyled text-capitalize">
                        {elem.products ? (
                          elem.products.map((productos) => {
                            return (
                              <li key={productos.id}>
                                <h6>{productos.nombre}</h6>
                              </li>
                            );
                          })
                        ) : (
                          <span>No hay productos</span>
                        )}
                      </ul>
                    </div>
                    {/* {columna precios} */}
                    <div className="column">
                      <h5 className="border-bottom font-weight-bold">
                        {" "}
                        Valor{" "}
                      </h5>
                      <ul className="list-unstyled text-capitalize">
                        {elem.products ? (
                          elem.products.map((productos) => {
                            return (
                              <li key={productos.id}>
                                <h6>${productos.precio}</h6>
                              </li>
                            );
                          })
                        ) : (
                          <span>No hay productos</span>
                        )}
                      </ul>
                    </div>
                    {/* {columna cantidad} */}
                    <div className="column">
                      <h5 className="border-bottom font-weight-bold">
                        {" "}
                        Cantidad{" "}
                      </h5>
                      <ul className="list-unstyled text-capitalize">
                        {elem.products ? (
                          elem.products.map((productos) => {
                            return (
                              <li key={productos.id}>
                                <h6>{productos.orderline.cantidad}</h6>
                              </li>
                            );
                          })
                        ) : (
                          <span>No hay productos</span>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="font-weight-bold">
                    <span> TOTAL: ${precioTotal(elem.products)} </span>
                    {/* {precioFinal} $ */}
                  </div>
                  <div className="d-flex flex-row-reverse">
                    <div className="m-1">
                      <button
                        className="btn btn-danger"
                        onClick={() => cancelarOrder(elem.id)}
                      >
                        Cancelar
                      </button>
                    </div>
                    <div className="m-1">
                      <button
                        className="btn btn-success"
                        onClick={() => completarOrder(elem.id)}
                      >
                        Completa
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : "no"}{" "}
      </div>
    </div>
  );
};
