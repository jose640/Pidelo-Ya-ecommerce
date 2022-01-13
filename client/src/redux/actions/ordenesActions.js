import axios from "axios";
import { OBTENER_ORDENES, OBTENER_TOTAL_ORDENES, EDITAR_ORDENES,  OBTENER_CARRITO,} from "../types";

export const obtenerOrden = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:3001/users/${id}/orders`);
  // console.log(res.data);

  try {
    dispatch({
      type: OBTENER_ORDENES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const obtenerOrdenes = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:3001/users/${id}/orders`);
  // console.log(res.data);

  try {
    dispatch({
      type: OBTENER_ORDENES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerCarrito = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:3001/users/${id}/cart`);
  // console.log(res.data);

  try {
    dispatch({
      type: OBTENER_CARRITO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const eliminarProductoDelCarrito = (idUser, idProduct) => (dispatch) => {
  axios
    .delete(`http://localhost:3001/users/${idUser}/product/${idProduct}/cart`)
    .then(() => {
      window.location.reload();
    });

  // dispatch({
  //   type: ELIMINAR_PRODUCTO_CARRITO,
  //   payload: res.data.id,
  // });
};

export const obtenerTotalOrdenes = () => async (dispatch) => {
  const res = await axios.get("http://localhost:3001/orders");

  try {
    dispatch({
      type: OBTENER_TOTAL_ORDENES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editarTodasOrdenes = (id, estado) => async (dispatch) => {
  const res = await axios.put(`http://localhost:3001/orders/${id}`, {
    estado: estado,
  });

  try {
    dispatch({
      type: EDITAR_ORDENES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
  window.location.reload();
};
