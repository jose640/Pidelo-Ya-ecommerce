import React from "react";
import { useDispatch } from "react-redux";
import { agregarAlCarrito } from "../redux/actions";

export const Boton = () => {
  const dispatch = useDispatch();

  let user = localStorage.getItem("usuario");

  if (user) {
    user = JSON.parse(user).id;
  } else {
    user = 1;
  }

  //json.parser()

  const agregar = (id, user) => {
    if (user) {
      user = JSON.parse(user).id;
    } else {
      user = 1;
    }
    dispatch(agregarAlCarrito(user, id));
  };

  return (
    <button
      type="button"
      className="btn btn-info btn-lg btn-block borde"
      onClick={() => agregar()}
    >
      anadir al carrito
    </button>
  );
};
