import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Auth.sass";
import { autenticarUsuario } from "../redux/actions";
import GoogleLogin from "react-google-login";

export const Ingresar = () => {
  const dispatch = useDispatch();

  /*   const [userLogged, setUserLogged] = useState([]); */
  const [ingreso, setIngreso] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setIngreso({
      ...ingreso,
      [e.target.name]: e.target.value,
    });
  };

  function responseGoogle(response) {
    console.log(response.profileObj);
  }

  return (
    <div className="container-fluid prueba">
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesión</h1>

          <form>
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
                placeholder="Contraseña"
                onChange={handleChange}
              />
            </div>

            <div className="campo-form enlace-cuenta">
              <a
                href
                onClick={() => {
                  dispatch(autenticarUsuario(ingreso));
                }}
              >
                Acceder
              </a>
            </div>
          </form>
          <Link to={"/registro"} className="">
            Registrarme
          </Link>
          <div>
            <GoogleLogin
              clientId="510204421304-podvvqurlo7v1m7e2rsq3dghcamgj1an.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
