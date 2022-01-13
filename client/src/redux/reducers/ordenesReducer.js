import { OBTENER_ORDENES, EDITAR_ORDENES, OBTENER_TOTAL_ORDENES,  OBTENER_CARRITO,} from "../types";

const initialState = {
  ordenes: [],
  totalOrdenes: [],
  editarOrdenes: [],
  carrito: [],  
};

export function ordenesReducer(state = initialState, action) {
  switch (action.type) {
    case OBTENER_ORDENES:
      return {
        ...state,
        ordenes: action.payload,
      };
    case OBTENER_TOTAL_ORDENES:
      return {
        ...state,
        totalOrdenes: action.payload,
      };
    case EDITAR_ORDENES:
      return {
        ...state,
        editarOrdenes: action.payload,
      };

    case OBTENER_CARRITO:
      return {
        ...state,
        carrito: action.payload,
      };
    // case ELIMINAR_PRODUCTO_CARRITO:
    //   return {
    //     ...state,
    //     carrito: state.carrito.filter(
    //       (produts) => produts.id !== action.payload.id
    //     ),
    //   };
    default:
      return state;
  }
}
