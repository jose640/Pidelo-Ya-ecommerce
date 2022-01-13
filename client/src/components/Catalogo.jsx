import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { obtenerCategorias } from "../redux/actions";
import ShowProdXCat from "./ShowProdXCat";

export const Catalogo = () => {
  const dispatch = useDispatch();

  const categorias = useSelector((store) => store.categorias.catalogo);

  useEffect(() => {
    dispatch(obtenerCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  



  return (
    <div className="container-fluid">
      <div className="row ">
        {categorias.map((c) => {
          return (
            <div className="w-100  " key={c.id}>
              <h1 className="mb-5">{c.nombre}</h1>

              <div className="renderProdxCat ">
                <ShowProdXCat cat={c.nombre} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
