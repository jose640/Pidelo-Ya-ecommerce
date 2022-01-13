import axios from "axios";

import {
  OBTENER_USUARIOS,
  INSERTAR_USUARIOS,
  OBTENER_TODOS_USUARIOS,
} from "../types/";

export const obtenerUsuarios = (id) => async (dispatch) => {
  const res = await axios.get(`http://localhost:3001/users/${id}`);

  try {
    dispatch({
      type: OBTENER_USUARIOS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const obtenerTodosUsuarios = () => async (dispatch) => {
  const res = await axios.get(`http://localhost:3001/users/`);

  try {
    dispatch({
      type: OBTENER_TODOS_USUARIOS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const enviarNuevoUsuario = (props) => async (dispatch) => {
  const { nombre, apellido, email, password, confirmarPassword } = props;

  if (
    nombre.trim() === "" ||
    nombre.length < 2 ||
    apellido.trim() === "" ||
    apellido.length < 2 ||
    email.trim() === "" ||
    !email.indexOf("@") === -1 ||
    !email.indexOf(".") === -1 ||
    password.trim() === "" ||
    password.length < 8 ||
    confirmarPassword.trim() === "" ||
    confirmarPassword.length < 8 ||
    password.trim() !== confirmarPassword.trim()
  ) {
    alert(
      "No pueden haber campos vacios. El mail tiene que ser valido, y las contraseñas tienen que ser iguales"
    );
    return;
  }

  try {
    const res = await axios({
      method: "post",
      data: {
        nombre,
        apellido,
        email,
        password,
        confirmarPassword,
      },
      withCredentials: true,
      url: `http://localhost:3001/users`,
    });

    dispatch({
      type: INSERTAR_USUARIOS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editarUsuario = (id, form) => async (dispatch) => {
  await axios.put(`http://localhost:3001/users/${id}`, form);
};

export const agregarAlCarrito = (idUser, idProduct) => async (dispatch) => {
  try {
    const res = await axios.post(
      `http://localhost:3001/users/${idUser}/product/${idProduct}/cart`
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarCarrito = (idUser) => () => {
  axios.delete(`http://localhost:3001/users/${idUser}/cart`);
  window.location.reload();
};
export const promoverUsuario = (id) => async (dispatch) => {
  await axios.put(`http://localhost:3001/auth/promote/${id}`);
};

export const eliminarUsuario = (id) => async () => {
  await axios.delete(`http://localhost:3001/users/${id}`);
};
