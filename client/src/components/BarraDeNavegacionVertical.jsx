import React from "react";
import "./BarraDeNavegacionVertical.scss";
import { Link } from "react-router-dom";

export const BarraDeNavegacionVertical = (idUser) => {
  return (
    <div id="wrapper" className="active">
      <div id="sidebar-wrapper">
        <ul id="sidebar_menu" className="sidebar-nav ">
          <li className="sidebar-brand">
            <Link to={`/user/${idUser.id}`}>Inicio</Link>
          </li>
        </ul>
        <ul className="sidebar-nav" id="sidebar">
          <li>
            <Link to={`/user/${idUser.id}/historial/ordenes`}>Historial</Link>
          </li>
          <ul className="sidebar-nav" id="sidebar">
            <li>
              <Link to={`/user/${idUser.id}/historial/facturas`}>Registro</Link>
            </li>

            <li className="sidebar-nav" id="sidebar">
              <button className="btn text-danger">Desconectar</button>
            </li>

          </ul>
        </ul>
      </div>
    </div>
  );
};

