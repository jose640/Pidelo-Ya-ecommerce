import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "@material-ui/core/Icon";
import "./Product.scss";
import { Boton, Calificacion } from "./";

export const Product = ({ nombre, precio, imagen, cantidad, id, stock }) => {
  return (
    <>
      <div className="clash-card barbarian sombra mb-5">
        <div>
          <div className="clash-card__image clash-card__image--barbarian">
            <img alt="barbarian" src={imagen} />
          </div>

          <div className="clash-card__unit-name">{nombre}</div>
          <br />
          {/* <div className="clash-card__unit-description">{descripcion}</div> */}
          <div className="row">
            <div className="col-10 font-weight-bold">
              <Calificacion />
            </div>
            <div className="d-flex flex-row-reverse">
              <a href={`http://localhost:3000/products/${id}/vermas`}>
                <Icon color="primary">add_circle</Icon>
              </a>
            </div>
          </div>
        </div>
        <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix ">
          <div className="one-third ">
            <div className="stat-value">
              <h6>Precio</h6>
            </div>
            <div className="stat">${precio}</div>
          </div>
          <div className="one-third no-border">
            <div className="stat-value">
              <h6>stock</h6>
            </div>
            <div className="stat">
              {cantidad}
              {/* <ShowSingleProduct /> */}
            </div>
          </div>
        </div>
        <Boton agregar={id} />
      </div>
    </>
  );
};
