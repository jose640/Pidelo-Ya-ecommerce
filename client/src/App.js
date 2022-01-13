import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import {
  Home,
  Catalogo,
  NavBar,
  FiltroCat,
  Carrito,
  //PaginaUser,
  //PaginaAdmin,
  // CrearCat,
  Pagina404,
  VerMasProduct,
  PaginaTipoUsuario,
  // Orden,
  // OrdenUser,
  // OrdenesCreadas,
  // OrdenesProcesando,
  // OrdenesCanceladas,
  // OrdenesCompletas,
} from "./components";
import { Ingresar, Registro } from "./auth";
import generarStore from "./store";

function App() {
  const store = generarStore();

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/category" component={Catalogo} />
          <Route exact path="/category/:nombreCat" component={FiltroCat} />
          <Route exact path="/products/:id/vermas" component={VerMasProduct} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/ingresar" component={Ingresar} />
          <Route exact path="/carrito/:id" component={Carrito} />
          <Route exact path="/user/:id/carrito/" component={Carrito} />
          <Route exact path="/user/:id" component={PaginaTipoUsuario} />
          <Route component={Pagina404} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
