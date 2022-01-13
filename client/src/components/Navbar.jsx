import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { SearchBar } from "./";

export const NavBar = () => {
  const categorias = useSelector((store) => store.categorias.catalogo);

  function logOut() {
    axios({
      method: "post",
      withCredentials: true,
      url: `http://localhost:3001/auth/logout`,
    });
    localStorage.removeItem("usuario");
    window.location.replace("/");
  }

  let user = localStorage.getItem("usuario");
  if (user) {
    user = JSON.parse(user).id;
  } else {
    user = 1;
  }

  console.log(categorias);

  if (localStorage.getItem("usuario") === null) {
    return (
      <nav className=" container-fluid w-100 bg-warning" id="esconder">
        <div className="row d-flex justify-content-end"></div>
        <div className="row mb-2">
          <div className="col-3  ">
            <h1 className=" texto  ">
              <Link className="link" to="/">
                Super Ricas
              </Link>
            </h1>
          </div>
          <div className="col-6 d-flex w-100">
            <SearchBar />
          </div>
          <div className="col-3  d-flex justify-content-center align-items-center ">
            <p className="mt-3 font-weight-bold">
              {" "}
              Tus Compras Estan Protegidas
            </p>
          </div>
        </div>

        <div className="row w-100 d-flex  mb-2 mt-3">
          <div className="col-1">
            <button className="rounded-circle">
              <a href={`http://localhost:3000/user/${user}/carrito`}>
                <img
                  src="https://png.pngtree.com/element_our/md/20180620/md_5b29c1dab1cf4.jpg"
                  alt=""
                  className="rounded-circle"
                  width="40"
                />
              </a>
            </button>
          </div>
          <div className="col-2  offset-2 ">
            <div className="btn-group show">
              <button
                type="button"
                className="btn  dropdown-toggle mt-2 "
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Categorias
              </button>
              <div className="dropdown-menu ">
                {categorias.map((e) => {
                  return (
                    <div className="container" key={e.id}>
                      <Link
                        className="dropdown-item "
                        style={{ textTransform: "capitalize" }}
                        to={`/category/${e.nombre}`}
                        key={e.id}
                      >
                        {e.nombre}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div>
              <div className="navbar navbar-expand-sm bg-warning">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/category" className="nav-link text-dark">
                      Todos los productos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-2  offset-2">
            <div>
              <div className="navbar navbar-expand-sm bg-warning">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to={"/ingresar"}>
                      Ingresar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to={"/registro"}>
                      Registrarse
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className=" container-fluid   w-100 bg-warning">
        <div className="row d-flex justify-content-end"></div>
        <div className="row mb-2">
          <div className="col-3  ">
            <h1 className=" texto  ">
              <Link className="link" to="/">
                Super Ricas
              </Link>
            </h1>
          </div>
          <div className="col-6 d-flex w-100">
            <SearchBar />
          </div>
          <div className="col-3  d-flex justify-content-center align-items-center ">
            <p className="mt-3 font-weight-bold">
              {" "}
              Tus Compras Estan Protegidas
            </p>
          </div>
        </div>

        <div className="row w-100 d-flex  mb-2 mt-3">
          <div className="col-1">
            <button className="rounded-circle">
              <a href={`user/${user}/carrito`}>
                <img
                  src="https://png.pngtree.com/element_our/md/20180620/md_5b29c1dab1cf4.jpg"
                  alt=""
                  className="rounded-circle"
                  width="40"
                />
              </a>
            </button>
          </div>
          <div className="col-2  offset-1 ">
            <div className="btn-group show">
              <button
                type="button"
                className="btn  dropdown-toggle mt-2 "
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Categorias
              </button>
              <div className="dropdown-menu">
                {categorias.map((e) => {
                  return (
                    <div className="container" key={e.id}>
                      <Link
                        className="dropdown-item "
                        style={{ textTransform: "capitalize" }}
                        to={`/category/${e.nombre}`}
                        key={e.id}
                      >
                        {e.nombre}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-3">
            <div>
              <div className="navbar navbar-expand-sm bg-warning">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to={"/"}>
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/category" className="nav-link text-dark">
                      Todos los productos
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div>
              <div className="navbar navbar-expand-sm bg-warning">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="btn" to={`/user/${user}`}>
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="btn" onClick={logOut} to={"/"}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};
