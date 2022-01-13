import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./FormCrud.sass";

import {
  obtenerProductos,
  obtenerCategorias,
  insertarProductos,
  editarProductos,
  eliminarProductos,
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

export function FormCrud() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.productos.productos).sort(
    (a, b) => a.id - b.id
  );
  const categories = useSelector((store) => store.categorias.catalogo);

  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  const [state, setState] = useState([]);
  const [file, setFile] = useState({});

  const [form, setForm] = useState({
    id: 1,
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
  });

  useEffect(() => {
    dispatch(obtenerProductos());
    dispatch(obtenerCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleImage = (e) => {
  //   let value = e.target.files;
  //   let reader = new FileReader();
  //   reader.readAsDataURL(value[0]);
  //   reader.onload = () => {
  //     let base64 = reader.result;

  //     form.imagen.push(base64);
  //   };
  // };

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
      precio: "",
      stock: "",
      imagen: "",
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
      precio: "",
      stock: "",
      imagen: "",
      descripcion: "",
    });
  };

  const insertar = () => {
    dispatch(insertarProductos(form, file, state));
    ocultarForm1();
    window.location.reload();
  };

  const editar = () => {
    dispatch(editarProductos(form));
    ocultarForm2();
    window.location.reload();
  };

  const eliminar = (id) => {
    dispatch(eliminarProductos(id));
    window.location.reload();
  };

  return (
    <>
      <Container className="prueva">
        <br />
        <div className="row ">
          <div className="col-12 mt-2 d-flex  justify-content-center">
            <Button color="success" onClick={mostrarForm1}>
              Insertar nuevo Producto
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
              <th>Precio</th>
              <th>Stock</th>

              <th>Descripcion</th>

              <th>Accciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.descripcion}</td>

                <td>
                  <Button
                    color="primary"
                    onClick={() => mostrarForm2(producto)}
                  >
                    Editar
                  </Button>
                  {"   "}
                  <Button color="danger" onClick={() => eliminar(producto.id)}>
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
            <h3>Insertar Producto</h3>
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
            <label>Precio:</label>

            <input
              type="number"
              className="form-control"
              name="precio"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Stock:</label>

            <input
              type="number"
              className="form-control"
              name="stock"
              onChange={handleChange}
            />
          </FormGroup>

          <div className="container">
            <div className="row">
              {categories.map((category) => (
                <div className="col-6" key={category.id}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={category.id}
                      name={category.id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const prueva = e.target.name;
                          setState([...state, prueva]);
                        } else {
                          const index = state.indexOf(e.target.name);
                          state.splice(index, 1);
                          setState([...state]);
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor={category.id}>
                      {category.nombre}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />

          <FormGroup>
            <label>Imagen:</label>

            <input
              type="file"
              className="form-control"
              name="imagen"
              encType="multipart/form-data"
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
                setForm({
                  ...form,
                  imagen: file,
                });
              }}
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
            <h3>Editar Producto</h3>
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
            <label>Precio:</label>

            <input
              type="number"
              className="form-control"
              name="precio"
              onChange={handleChange}
              value={form.precio}
            />
          </FormGroup>

          <FormGroup>
            <label>Stock:</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              onChange={handleChange}
              value={form.stock}
            />{" "}
          </FormGroup>

          <FormGroup>
            <label>Imagen:</label>

            <input
              type="file"
              className="form-control"
              name="imagen"
              encType="multipart/form-data"
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
                setForm({
                  ...form,
                  imagen: file,
                });
              }}
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
        <div className="row"></div>
      </div>
    </>
  );
}
