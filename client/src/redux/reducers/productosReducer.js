import { OBTENER_PRODUCTOS, PRODUCTO_ACTUALIZADO, OBTENER_PRODUCTO } from "../types";

const initialState = {
  productos: [],
  producto: [],
};

export function productosReducer(state = initialState, action) {
  switch (action.type) {
    case OBTENER_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };

    case OBTENER_PRODUCTO:
      return {
        ...state,
        producto: action.payload,
      };

    case PRODUCTO_ACTUALIZADO:
      return {
        ...state,
        productos: state.productos.map((producto) => {
          if (producto.id === action.payload.id) {
            return { ...action.payload };
          } else {
            return producto;
          }
        }),
      };
    default:
      return state;
  }
}