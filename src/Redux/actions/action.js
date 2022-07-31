import {
  addTodo,
  editTodo,
  deleteTodo,
  deleteAllTodo,
} from "../../constants/reduxConstants";

export const addTodoAction = (data) => {
  console.log(data);
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

export const deleteAllTodoAction = () => {
  return {
    type: deleteAllTodo,
  };
};
