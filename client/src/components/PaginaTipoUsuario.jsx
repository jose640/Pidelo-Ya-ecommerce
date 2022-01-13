import React from "react";
import { Route } from "react-router";
import { PaginaAdmin, PaginaUser } from "./";
import "./PaginaUser.sass";

export const PaginaTipoUsuario = () => {
  const user = JSON.parse(localStorage.getItem("usuario"));

  if (user.tipoUsuario === "Admin") {
    return (
      <div>
        <PaginaAdmin />
      </div>
    );
  } else {
    return (
      <div>
        <PaginaUser />
      </div>
    );
  }
};
