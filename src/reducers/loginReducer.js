import { ADD_USER, UPDATE_USER } from "../ActionTypes/actionTypes";

const defaultState = {
  addedUser: [],
};

const LoginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        addedUser: [...state.addedUser, action.payload],
      };
    case UPDATE_USER:
      return {
        ...state,
        addedUser: action.payload,
      };
    default:
      return state;
  }
};

export default LoginReducer;
