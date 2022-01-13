import { OBTENER_CATALOGO } from "../types";

const initialState = {
  catalogo: [],
};

export function catalogoReducer(state = initialState, action) {
  switch (action.type) {
    case OBTENER_CATALOGO:
      return {
        ...state,
        catalogo: action.payload,
      };
    default:
      return state;
  }
}
