import React from "react";
import "./BarraDeNavegacionVertical.scss";
import { Link } from "react-router-dom";

export const BarraDeNavegacionVerticalAdmin = () => {
  const user = localStorage.getItem("usuario");

  let us;
  if (user) {
    us = JSON.parse(user).id;
  } else {
    us = 1;
  }
  return (
    <div id="wrapper" className="active">
      <div id="sidebar-wrapper">
        <ul id="sidebar_menu" className="sidebar-nav ">
          <li className="sidebar-brand">
            <Link className="text-white" to={`/user/${us}`}>
              Inicio
            </Link>
          </li>
        </ul>
        <ul className="sidebar-nav" id="sidebar">
          <li>
            <Link to="/user/ordenescreadas">Creadas</Link>
          </li>
          <li>
            <Link to="/user/ordenesprocesando">Proceso</Link>

            <Link to="/user/ordenescompletas">Completadas</Link>
          </li>
          <li>
            <Link to="/user/ordernescanceladas">Canceladas</Link>
          </li>
          <li>
            <Link to="/user/product">Productos</Link>
          </li>
          <li>
            <span>
              <Link to="/user/category">Categorias</Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/user/listaUsuarios">Usuarios</Link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
