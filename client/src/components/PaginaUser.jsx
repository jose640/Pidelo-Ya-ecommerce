import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { BarraDeNavegacionVertical, UsuarioRegistro, OrdenUser } from "./";
import { User } from "../Containers";
import "./PaginaUser.sass";
import { useParams } from "react-router-dom";

export const PaginaUser = () => {
  var idUser = useParams().id;

  return (
    <div className="container-fluid margin">
      <div className="row">
        <Router>
          <div className="col-12">
            <BarraDeNavegacionVertical id={idUser} />
          </div>
          <br />

          <div className="col-10 offset-2">
            <Switch>
              <Route exact path="/user/:id" component={User} />
              <Route exact path={`/user/:id/historial/ordenes`}>
                <OrdenUser />
              </Route>
              <Route exact path={`/user/:id/historial/facturas`}>
                <UsuarioRegistro />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};
