import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./";
import { useParams } from "react-router-dom";

export const ShowSingleProduct = () => {
  const [product, setProduct] = useState([]);

  let id = useParams().id;

  useEffect(() => {
    (async () => {
      const results = await axios.get(`http://localhost:3001/products/${id}`);
      setProduct(results.data);
    })();
  }, [id]);

  return (
    // {/* COLUMNA INDIVIDUAL PARA CADA PRODUCTO RENDERIZADO  */}
    <div className="col mt-5">
      <div className="card shadow-sm">
        <Product
          nombre={product.nombre}
          descripcion={product.descripcion}
          precio={product.precio}
          cantidad={
            product.stock === 0 ? (
              <div>
                <span className="text-danger"> AGOTADO </span>
              </div>
            ) : (
              product.stock
            )
          }
          id={product.id}
          imagen={product.imagen}
          stock={product.stock}
        />
      </div>
    </div>
  );
};
