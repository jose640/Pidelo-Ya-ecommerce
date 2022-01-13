import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../components/FormCrud.sass";
import {
  obtenerUsuarios,
  ejecutarMailGun,
  editarUsuario,
} from "../redux/actions";
import axios from "axios";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
} from "reactstrap";

export const User = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const id = useParams().id;
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((store) => store.usuarios.usuarios);
  useEffect(() => {
    dispatch(obtenerUsuarios(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mail = { message: "exito", subject: "exito" };

  const enviarMail = async () => {
    try {
      await axios("/mailgun", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(mail),
      });
    } catch (err) {
      throw err;
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const editar = () => {
    dispatch(editarUsuario(usuario.id, form));
    dispatch(
      ejecutarMailGun({
        message: `Se actualizó tu información personal exitosamente: Nombre: ${form.nombre} Apellido: ${form.apellido} Mail:${form.email} Contraseña:${form.contraseña}`,
      })
    );
    setModal(false);
    window.location.reload();
  };

  return (
    <>
      <Container className="prueva container-fluid">
        <div className="perfilUserHeader">
          <h1 className="text-center text-capitalize">
            Bienvenid@ {user.nombre} {user.apellido}
          </h1>
          <br />
          <section>
            <div>
              <p className="text-uppercase text-center">
                Este es tu espacio donde puedes consultar Las compras que has
                hecho, tus pedidos en proceso y tu información personal.
              </p>
            </div>
          </section>
        </div>
        <br />

        <div className="row justify-content-around ">
          {/* {columna productos} */}
          <div className="column">
            <ul className="list-unstyled text-capitalize">
              <li>
                <h4>Nombre:</h4>
              </li>
              <li>
                <h4> Apellido:</h4>
              </li>
              <li>
                <h4>E-Mail:</h4>
              </li>
              <li>
                <h4>Contraseña:</h4>
              </li>
            </ul>
          </div>
          {/* {columna precios} */}
          <div className="column">
            <h5 className="border-bottom"></h5>
            <ul className="list-unstyled text-capitalize">
              <li>
                <h4>{user.nombre} </h4>
              </li>
              <li>
                <h4>{user.apellido}</h4>
              </li>
              <li>
                <h4>{user.email}</h4>
              </li>
              <li>
                <h4>********</h4>
              </li>
            </ul>
          </div>
        </div>
        <div className="botonEditar d-flex justify-content-around ">
          <div>
            <button
              className="bg-info border-light rounded font-italic font-weight-normal"
              onClick={() => setModal(true)}
            >
              <h4 className="font-italic font-weight-normal">
                EDITA TU INFORMACIÓN PERSONAL
              </h4>
            </button>
          </div>
        </div>
      </Container>

      <Modal isOpen={modal}>
        <ModalHeader>
          <div>
            <h3 className="text-center">Editar Nombre</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <input
              type="text"
              className="form-control "
              name="nombre"
              onChange={handleChange}
              placeholder={user.nombre}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="text"
              className="form-control "
              name="apellido"
              onChange={handleChange}
              placeholder={user.apellido}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="text"
              className="form-control "
              name="email"
              onChange={handleChange}
              placeholder={user.email}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="text"
              className="form-control"
              name="contraseña"
              onChange={handleChange}
              placeholder="**********"
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={() => editar()}>
            Aceptar
          </Button>
          <Button color="danger" onClick={() => setModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
