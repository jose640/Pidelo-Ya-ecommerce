import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { BarraDeNavegacionVerticalAdmin } from "./";
import {
  FormCrud,
  OrdenesCreadas,
  OrdenesProcesando,
  OrdenesCompletas,
  OrdenesCanceladas,
  CrearCatCrud,
  ListaUsersPagAdmin,
} from "./";
import { Admin } from "../Containers";

export const PaginaAdmin = () => {
  return (
    <div className="container-fluid margin">
      <div className="row">
        <Router>
          <div className="row">
            <BarraDeNavegacionVerticalAdmin />
          </div>
          <br />

          <div className="col-10 offset-2">
            <Switch>
              <Route exact path="/user/product" component={FormCrud} />
              <Route
                exact
                path="/user/ordenescreadas"
                component={OrdenesCreadas}
              />
              <Route
                exact
                path="/user/ordenesprocesando"
                component={OrdenesProcesando}
              />
              <Route
                exact
                path="/user/ordernescanceladas"
                component={OrdenesCanceladas}
              />
              <Route
                exact
                path="/user/ordenescompletas"
                component={OrdenesCompletas}
              />
              <Route exact path="/user/category" component={CrearCatCrud} />
              <Route
                exact
                path="/user/listaUsuarios"
                component={ListaUsersPagAdmin}
              />
              <Route exact path="/user/:id" component={Admin} />
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
};
