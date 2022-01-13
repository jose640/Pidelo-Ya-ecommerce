import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Product } from "./";

function ShowProdXCat({ cat }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await axios.get(`http://localhost:3001/category/${cat}`);

      if (results.data) {
        if (results.data.products[0]) {
          setProductos(
            results.data.products.map((p) => {
              return p;
            })
          );
        }
      }
    })();
  }, [cat]);

  return (
    <>
      {productos.map((e) => (
        // {/* COLUMNA DE INDIVIDUAL PARA CADA PRODUCTO RENDERIZADO  */}

        <span className="ml-5" key={e.id}>
          {" "}
          <Product
            nombre={e.nombre}
            descripcion={e.descripcion}
            precio={e.precio}
            cantidad={
              e.stock === 0 ? (
                <div>
                  <span className="text-danger"> AGOTADO </span>
                </div>
              ) : (
                e.stock
              )
            }
            id={e.id}
            imagen={e.imagen}
            stock={e.stock}
          />
        </span>
      ))}
    </>
  );
}

export default ShowProdXCat;
