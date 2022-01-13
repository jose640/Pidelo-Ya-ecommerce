import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from '@material-ui/icons/Edit';
import Rating from '@material-ui/lab/Rating';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import "./FormCrud.sass";
import {
  obtenerReviews,
  agregarReview,
  editarReview,
  eliminarReview,
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


export const Review = () => {
  const idProduct = useParams().id;
    const dispatch = useDispatch();
    const producto = useSelector((store) => store.reviews.reviews);
    const user = localStorage.getItem("usuario");
    const idUser = JSON.parse(user).id
    
    const [mostrar, setMostrar] = useState(false);
    const [mostrar2, setMostrar2] = useState(false);
    const [value, setValue] = useState(0);
    const [form, setForm] = useState({
      puntuacion: 0,
      descripcion: "",
    });

    useEffect(() => {
      dispatch(obtenerReviews(idProduct));
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
        puntuacion: 0,
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
        puntuacion: 0,
        descripcion: "",
      });
    };
   
    const insertar = () => {
      dispatch(agregarReview(idProduct, idUser, form));
      ocultarForm1();
      window.location.reload();
    };
  
    const editar = () => {
      dispatch(editarReview(idProduct, idUser, form));
      ocultarForm2();
      window.location.reload()
    };
    const eliminar = (id) => {
      dispatch(eliminarReview(idProduct, idUser));
      window.location.reload()
    };

return (
    <div>
         <Container className="prueva">
            {producto.users ? producto.users.map((users) => { 
              return(
        <Table key={users.id}>
          <tbody>
              <tr>
                <td><h6>{users.nombre} {users.apellido}</h6> <Rating name="read-only" value={users.review.puntuacion} readOnly /></td>
              </tr>
              <tr> 
                <td>{users.review.descripcion}</td>
                {users.id === idUser ? 
                 <td>
                    <EditIcon onClick={() => mostrarForm2(users.review)} />
                    <DeleteForeverOutlinedIcon onClick={eliminar} />
                </td> : null }
              </tr>  
          </tbody>
        </Table>        
     )}) : null}
      </Container>

      <Modal isOpen={mostrar}>
        
        <ModalHeader>
          <div>
            <h3>Agregar Review</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Calificacion:</label>
            <br />
            <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setForm({
              ...form,
               puntuacion: newValue}); 
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
            <h3>Editar Review</h3>
          </div>
        </ModalHeader>

        <ModalBody>

          <FormGroup>
            <label>Calificacion:</label>
            <br />
            <Rating
            name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setForm({
              ...form,
               puntuacion: newValue}); 
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
          <Button color="success" onClick={editar}>
            Aceptar
          </Button>
          <Button color="danger" onClick={ocultarForm2}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <div className="Container">
        <div className="flex-row-reverse ">
              <div className="col-12 mt-2 d-flex  justify-content-center">
            <Button color="success" onClick={mostrarForm1}>
              Agregar Review
            </Button>
            </div>

        </div>
      </div>
    </div>
)

}
