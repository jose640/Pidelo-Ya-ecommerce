import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container } from "reactstrap";
import {
  obtenerTodosUsuarios,
  eliminarUsuario,
  promoverUsuario,
} from "../redux/actions";
import "./FormCrud.sass";

export const ListaUsersPagAdmin = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.usuarios.todosUsuarios);

  useEffect(() => {
    dispatch(obtenerTodosUsuarios());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eliminar = (id) => {
    dispatch(eliminarUsuario(id.toString()));
    // window.location.replace("/admin/listaUsuarios");
  };

  const promover = (id) => {
      dispatch(promoverUsuario(id.toString()));
      // window.location.replace("/admin/listaUsuarios");
  }

  

  return (
    <Container className="prueva">
      <div className="">
        <div>
          <div className="header">
            <h3>Lista de Usuarios</h3>
          </div>
        </div>
        {users.map((user) => {
          return (
            <div className="orden">
              <div className="text-center column border border-dark rounded mt-5 p-3">
                <div className="row justify-content-around ">
                  {/* {columna IDuser} */}
                  <div className="column">
                    <h5 className="border-bottom"> ID </h5>
                    <ul className="list-unstyled text-capitalize">
                      <li> {user.id}</li>
                    </ul>
                  </div>
                  {/* {columna Nombre} */}
                  <div className="column">
                    <h5 className="border-bottom"> Nombre </h5>
                    <ul className="list-unstyled text-capitalize">
                      <li> {user.nombre + " " + user.apellido}</li>
                    </ul>
                  </div>
                  {/* {columna E-mail} */}
                  <div className="column">
                    <h5 className="border-bottom"> E-Mail </h5>
                    <ul className="list-unstyled text-capitalize">
                      <li className="text-lowercase">{user.email}</li>
                    </ul>
                  </div>
                  {/* {columna tipoUsuario} */}
                  <div className="column">
                    <h5 className="border-bottom"> Tipo de Usuario </h5>
                    <ul className="list-unstyled text-capitalize">
                      <li> {user.tipoUsuario}</li>
                      {user.tipoUsuario === "Cliente" ? (
                        <div>
                          <Button
                            color="success"
                            onClick={() => promover(user.id)}
                          >
                            Promover
                          </Button>
                          {/* <button >Eliminar</button> */}
                          <Button
                            color="danger"
                            onClick={() => eliminar(user.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
