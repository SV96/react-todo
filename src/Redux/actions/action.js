import { addTodo, editTodo, deleteTodo } from "../../constants/reduxConstants";

export const addTodoAction = (data) => {
  return {
    type: addTodo,
    data: data,
  };
};

export const editTodoAction = (data) => {
  return {
    type: editTodo,
    data: data,
  };
};

export const deleteTodoAction = (data) => {
  return {
    type: deleteTodo,
    data: data,
  };
};
