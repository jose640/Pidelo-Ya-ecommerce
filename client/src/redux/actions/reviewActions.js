import axios from "axios";
import { OBTENER_REVIEWS, AGREGAR_REVIEW,  MODIFICAR_REVIEW } from "../types";

export const obtenerReviews = (id) => async (dispatch) => {

    const res = await axios.get(`http://localhost:3001/products/${id}/review`);

  try {
    dispatch({
      type: OBTENER_REVIEWS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const agregarReview = (idProduct, idUser, object) => async (dispatch) => {
    const {descripcion, puntuacion} = object;

    const res = await axios.post(`http://localhost:3001/products/${idProduct}/user/${idUser}/reviews`, {
        descripcion: descripcion,
        puntuacion: puntuacion,
    });

    try {  
      dispatch({
        type: AGREGAR_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const editarReview = (idProduct, idUser, object) => async (dispatch) => {
    const {descripcion, puntuacion} = object;

    const res = await axios.put(`http://localhost:3001/products/${idProduct}/user/${idUser}`,{
        descripcion: descripcion,
        puntuacion: puntuacion,
    });
  
    try {
      dispatch({
        type: MODIFICAR_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const eliminarReview = (idProduct, idUser) => async () => {
    await axios.delete(`http://localhost:3001/products/${idProduct}/user/${idUser}`);
  };