import {
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEMS,
} from "../ActionTypes/actionTypes";

const defaultState = {
  todoItem: [],
};

const CartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        todoItem: [...state.todoItem, action.payload],
      };
    case DELETE_ITEM:
      const filteredTodos = state.todoItem.filter(
        (todoIte, index) => todoIte._id !== action.payload
      );
      return {
        ...state,
        todoItem: filteredTodos,
      };
    case UPDATE_ITEMS:
      return {
        ...state,
        todoItem: action.payload,
      };

    default:
      return state;
  }
};

export default CartReducer;
