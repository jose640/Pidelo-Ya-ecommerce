import {
  OBTENER_USUARIOS,
  INSERTAR_USUARIOS,
  OBTENER_TODOS_USUARIOS,
} from "../types";

const initialState = {
  usuarios: [],
  todosUsuarios: [],
};

export function usuariosReducer(state = initialState, action) {
  switch (action.type) {
    case OBTENER_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };
    case INSERTAR_USUARIOS:
      return {
        ...state,
        usuarios: state.usuarios.map((user) => {
          if (user.id === action.payload.id) {
            return {
              ...action.payload,
            };
          }
          return user;
        }),
      };
    case OBTENER_TODOS_USUARIOS:
      return {
        ...state,
        todosUsuarios: action.payload,
      };
    default:
      return state;
  }
}
