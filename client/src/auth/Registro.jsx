import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.sass";
import { useDispatch } from "react-redux";
import { enviarNuevoUsuario } from "../redux/actions";

export const Registro = () => {
  const dispatch = useDispatch();

  const [registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmarPassword: "",
  });

  const handleChange = (e) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fuid prueba">
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Crear Nueva Cuenta</h1>

          <form onSubmit={enviarNuevoUsuario}>
            <div className="campo-form">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                onChange={handleChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                placeholder="Apellido"
                onChange={handleChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="campo-form">
              <label htmlFor="confirmarPassword">Confirmar Password</label>
              <input
                type="password"
                id="confirmarPassword"
                name="confirmarPassword"
                placeholder="Repetir Password"
                onChange={handleChange}
              />
            </div>

            <div className="btn btn-primario btn-block text-primary">
              <Link
                to={"/ingresar"}
                onClick={() => {
                  dispatch(enviarNuevoUsuario(registro));
                }}
              >
                Registrarme
              </Link>
            </div>
          </form>
          <Link to={"/ingresar"} className="enlace-cuenta">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
