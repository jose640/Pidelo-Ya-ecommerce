import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {
  productosReducer,
  catalogoReducer,
  ordenesReducer,
  usuariosReducer,
  reviewReducer,
  authReducer,
} from "./redux/reducers";

const rootReducer = combineReducers({
  productos: productosReducer,
  categorias: catalogoReducer,
  ordenes: ordenesReducer,
  usuario: authReducer,
  usuarios: usuariosReducer,
  reviews: reviewReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generarStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
