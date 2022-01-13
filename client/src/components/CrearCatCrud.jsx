import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FormCrud.sass";
import {
  obtenerCategorias,
  insertarCategorias,
  editarCategorias,
  eliminarCategorias,
} from "../redux/actions";
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

export const CrearCatCrud = () => {
  const dispatch = useDispatch();

  const categories = useSelector((store) => store.categorias.catalogo);
  const user = JSON.parse(localStorage.getItem("usuario"));

  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);

  const [form, setForm] = useState({
    id: 1,
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    dispatch(obtenerCategorias());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mostrarForm1 = () => {
    setMostrar(true);
  };
  const ocultarForm1 = () => {
    setMostrar(false);
    setForm({
      id: 1,
      nombre: "",
      descripcion: "",
    });
  };
  const mostrarForm2 = (registro) => {
    setForm(registro);
    setMostrar2(true);
  };
  const ocultarForm2 = () => {
    setMostrar2(false);
    setForm({
      id: 1,
      nombre: "",
      descripcion: "",
    });
  };

  const insertar = () => {
    dispatch(insertarCategorias(form));
    ocultarForm1();
    window.location.reload();
  };

  const editar = () => {
    dispatch(editarCategorias(form));

    ocultarForm2();
    window.location.reload();
  };
  const eliminar = (id) => {
    dispatch(eliminarCategorias(id));

    window.location.reload();
  };

  return (
    <div>
      <Container className="prueva">
        <br />
        <div className="row ">
          <div className="col-12 mt-2 d-flex  justify-content-center">
            <Button color="success" onClick={mostrarForm1}>
              Insertar nueva Categoría
            </Button>
          </div>
        </div>

        <br />
        <br />

        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>

              <th>Descripcion</th>

              <th>Accciones</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.nombre}</td>
                <td>{category.descripcion}</td>

                <td>
                  <Button
                    color="primary"
                    onClick={() => mostrarForm2(category)}
                  >
                    Editar
                  </Button>
                  {"   "}
                  <Button color="danger" onClick={() => eliminar(category.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={mostrar}>
        <ModalHeader>
          <div>
            <h3>Insertar Categoría</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Nombre:</label>

            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>

            <textarea
              onChange={handleChange}
              name="descripcion"
              className=" w-100 form-control"
            ></textarea>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={insertar}>
            Aceptar
          </Button>
          <Button color="danger" onClick={ocultarForm1}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={mostrar2}>
        <ModalHeader>
          <div>
            <h3>Editar Categoria</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>

            <input
              type="text"
              className="form-control"
              readOnly
              disabled
              name="id"
              value={form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>

            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={form.nombre}
            />
          </FormGroup>

          <FormGroup>
            <label>Descripcion:</label>

            <textarea
              name="descripcion"
              className=" w-100 form-control"
              onChange={handleChange}
              value={form.descripcion}
            ></textarea>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="success" onClick={() => editar()}>
            Aceptar
          </Button>
          <Button color="danger" onClick={ocultarForm2}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <div className="Container">
        <div className="row">
          {/*productos.map((e) => (
            <div className="col-3 mt-5" key={e.id}>
              <Product
                nombre={e.nombre}
                descripcion={e.descripcion}
                precio={e.precio}
                cantidad={e.stock}
              />
            </div>
          ))*/}
        </div>
      </div>
    </div>
  );
}
