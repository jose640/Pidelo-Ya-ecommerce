import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SearchBar.sass";
import { obtenerProductos } from "../redux/actions";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const dbProductos = useSelector((store) => store.productos.productos);

  const [inputProducto, setInputProducto] = useState("");

  useEffect(() => {
    dispatch(obtenerProductos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="nav-item dropdown w-100 m-auto">
      <input
        type="search"
        autoComplete="off"
        placeholder="Buscar Producto"
        onChange={(e) => {
          setInputProducto(e.target.value);
        }}
        className="nav-link dropdown-toggle  w-100 border border-light p-2"
        href="#"
        id="navbarDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
      />

      {/* dropdown & filter */}
      <div
        className="dropdown-menu"
        aria-labelledby="navbarDropdown"
        style={{ width: "200px" }}
      >
        {/* <productList> */}

        {inputProducto === ""
          ? null
          : dbProductos
              .filter((p) =>
                p.nombre.toLowerCase().includes(inputProducto.toLowerCase())
              )
              .map((item) => {
                var linkId = `/products/${item.id}/vermas`;
                return (
                  <div key={item.id}>
                    <a className="link mb-5" href={linkId}>
                      {item.nombre}
                    </a>
                    <br />
                  </div>
                );
              })}
      </div>
    </div>
  );
};

