import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  obtenerReviews,
} from "../redux/actions";

export function Calificacion() {
  const idProduct = useParams().id;
  const dispatch = useDispatch();
  const producto = useSelector((store) => store.reviews.reviews);
  const [contador, setContador] = useState(0);


    useEffect(() => {
      dispatch(obtenerReviews(idProduct));
      const newContador =  () => {
        let contadorTotal = 0;
    
        const res =  producto.users ? producto.users.map((users) => (contadorTotal += users.review.puntuacion)): null;
        console.log(Math.round(contadorTotal/5))
         setContador(Math.round(contadorTotal/5));
         return res;
        }
        newContador();

       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"><h6>Calificasion</h6></Typography>
        <Rating name="read-only" value={contador} readOnly />
      </Box>
    </div>
  );
}
