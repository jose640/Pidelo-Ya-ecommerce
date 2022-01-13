import axios from "axios";
import { OBTENER_CATALOGO } from "../types";

export const obtenerCategorias = () => async (dispatch) => {
  const res = await axios.get("http://localhost:3001/category/");

  try {
    dispatch({
      type: OBTENER_CATALOGO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const insertarCategorias = (obj) => async () => {
  const { nombre } = obj;

  if (nombre.trim() === "") {
    alert("Campo 'Nombre' obligatorio");
    return;
  }

  try {
    await axios.post(`http://localhost:3001/category`, obj);
  } catch (err) {
    console.log(err);
  }
};

export const editarCategorias = (obj) => async () => {
  const { id, nombre, descripcion } = obj;

  await axios.put(`http://localhost:3001/category/${id}`, {
    nombre,
    descripcion,
  });
};

export const eliminarCategorias = (id) => async () => {
  await axios.delete(`http://localhost:3001/category/${id}`);
};
