import axios from "axios";
import {
  OBTENER_PRODUCTOS,
  PRODUCTO_ACTUALIZADO,
  OBTENER_PRODUCTO,
} from "../types";

export const obtenerProductos = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/products/");

    dispatch({
      type: OBTENER_PRODUCTOS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProducto = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3001/products/${id}`);

    dispatch({
      type: OBTENER_PRODUCTO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const insertarProductos = (form, file, state) => () => {
  const { nombre, precio, stock, descripcion } = form;
  const data = new FormData();
  data.append("nombre", nombre);
  data.append("precio", Number(precio));
  data.append("stock", Number(stock));
  data.append("descripcion", descripcion);
  data.append("imagen", file);

  if (
    nombre.trim() === "" ||
    precio.trim() === "" ||
    stock.trim() === "" ||
    descripcion.trim() === "" ||
    state.length < 1
  ) {
    alert("no puede aver campos vacios");
    return;
  }

  axios
    .post(`http://localhost:3001/products`, data)
    .then((f) => {
      state.forEach((e) => {
        axios.post(`http://localhost:3001/products/${f.data.id}/category/${e}`);
      });
      // window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editarProductos = (objet) => async (dispatch) => {
  const { id, nombre, precio, stock, imagen, descripcion } = objet;

  const res = await axios.put(`http://localhost:3001/products/${id}`, {
    nombre,
    precio: Number(precio),
    stock: Number(stock),
    imagen,
    descripcion,
  });

  dispatch({
    type: PRODUCTO_ACTUALIZADO,
    payload: res.data,
  });
};

export const eliminarProductos = (id) => async () => {
  await axios.delete(`http://localhost:3001/products/${id}`);
};
