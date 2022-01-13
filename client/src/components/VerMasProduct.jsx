import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { Boton, Calificacion, Review  } from "./";
import { useParams } from "react-router";
import { obtenerProducto } from "../redux/actions";

export const VerMasProduct = () => {
  const dispatch = useDispatch();
  const idProduct = useParams().id;
  const producto = useSelector((store) => store.productos.producto);
  const review = useSelector((store) => store.reviews.reviews);
  const {id, imagen, nombre, precio, descripcion} = producto;


  useEffect(() => {
    dispatch(obtenerProducto(idProduct));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div>
    <div className="row bg-info text-white"><div className="m-l-4"><h1>PRODUCTO</h1></div></div>
      <div className="row">
        <div className="col-5">
        <img alt="producto" className="img-thumbnail" src={imagen} />
        </div>
        <div className="col-6">
        <br />
        <br />
        <br />
          <div className="row justify-content-around">
            <h1>{nombre}</h1>
          </div>
          <br />
          <div className="row justify-content-around">
          <Calificacion />
          </div>
          <div className="row justify-content-around">
            <h4>{descripcion}</h4>
          </div>
          <br />
          <div className="row justify-content-around">
            <h4>Precio: ${precio}</h4>
          </div>
          <br />
        <div className="row justify-content-around">
          <div>
        <Boton agregarAlCarrito ={id} />
          </div>
        </div>
        </div>
        </div>
    </div>
    <br />
    <br />
    <div className="row justify-content-around">
      <div className="col-7">
        <div className="border-dark">
          <div className="bg-info text-white">
          <h4>REVIEWS</h4>
          </div>
          <div className="p-5">
            <Review id={id} />
          </div>
          </div>

      </div>
    </div>
    </>
  );
};