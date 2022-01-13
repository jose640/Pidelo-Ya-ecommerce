import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

import {
  eliminarCarrito,
  editarTodasOrdenes,
  obtenerCarrito,
  eliminarProductoDelCarrito,
} from "../redux/actions";

export const Carrito = () => {
  const dispatch = useDispatch();

  const carrito = useSelector((store) => store.ordenes.carrito);
  // const id = useParams().id;
  let idUser = localStorage.getItem("usuario");
  if (idUser) {
    idUser = JSON.parse(idUser).id;
  } else {
    idUser = 1;
  }
  let prueva2 = [];

  useEffect(() => {
    dispatch(obtenerCarrito(idUser));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (carrito.length !== 0) {
    const prueva = carrito.map((orden) => orden.products.map((i) => i.precio));
    prueva2 = prueva.reduce((c, i) => c.concat(i));
  
  }



  return (
    <div className="container">
      {carrito.map((orden) => {
        return orden.products.map((product) => (
          <div className="card mb-5 " key={product.id}>
            <div className="row ">
              <div className="col-8 ">
                <div className="card-body">
                  <h4 className="card-title">{product.nombre}</h4>
                  <p className="card-text">{product.descripcion}</p>

                  <button
                    className="btn btn-primary w-25 mb-2 ml-2"
                    onClick={() =>
                      dispatch(eliminarProductoDelCarrito(idUser, product.id))
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </div>

              <div className="col-4 m-auto font-weight-bold text-success">
                Valor: {product.precio}$
              </div>
            </div>
          </div>
        ));
      })}

      <div className="container w-50 m-auto border p-5">
        <h2 className="text-center mb-5">Total</h2>
        <p className="text-center text-success font-weight-bold">
          {prueva2.reduce((c, i) => c + i, 0)}
        </p>

        <div className="d-flex justify-content-around">
          <button
            className="btn btn-primary w-25"
            onClick={() => {
              dispatch(editarTodasOrdenes(carrito[0].id, "creada"));
            }}
          >
            Pagar
          </button>
          <button
            className="btn btn-danger w-25"
            onClick={() => dispatch(eliminarCarrito(idUser))}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
