//Este componente va a renderizar una sola categoria, filtrada.
//Usa la misma lógica que catalogo y showprodXcat juntos,
//Si se puede refactorizar Catalogo para que reciba propiedades a travez
//de link, nos ahorramos este archivo, pero de esta manera fué mucho mas rapido
//el desarrollo. Investigar pasar parametros por Link Router

import React from "react";
import ShowProdXCat from "./ShowProdXCat";
import { useParams } from "react-router-dom";

export const FiltroCat = () => {
  var catXparams = useParams().nombreCat;


  return (
    <div className=" container">
      <div className=" m-auto">
        <h1>{catXparams}</h1>
        <hr />
      </div>

      <div>
        <ShowProdXCat cat={catXparams} />
      </div>
    </div>
  );
};
