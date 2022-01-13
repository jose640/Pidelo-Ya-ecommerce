import { OBTENER_REVIEWS } from "../types";

const initialState = {
  reviews: [],
};

export function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case OBTENER_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
}