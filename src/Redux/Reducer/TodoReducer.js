import {
  addTodo,
  editTodo,
  deleteTodo,
  deleteAllTodo,
} from "../../constants/reduxConstants";

const initialTodos = {
  todos: {},
};

const todoReducer = (state = initialTodos, action) => {
  switch (action.type) {
    case addTodo:
      let todoId = Object.keys(state.todos).length + 1;
      return {
        todos: {
          ...state.todos,
          [todoId]: action.data,
        },
      };
    case editTodo:
      delete state.todos[action.data.id];
      return {
        todos: {
          ...state.todos,
          [action.data.id]: action.data.todoData,
        },
      };
    case deleteTodo:
      delete state.todos[action.data.id];
      console.log();
      return {
        todos: { ...state.todos },
      };
    case deleteAllTodo:
      return {};
    default:
      return state;
  }
};

export default todoReducer;
