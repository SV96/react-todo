import TodoApp from "../TodoComponents";
import TodoAddEdit from "../TodoComponents/todoAddEdit";

const appRouting = {
  app: {
    exact: true,
    path: "/",
    components: <TodoApp />,
  },
  addTodo: {
    exact: true,
    path: "/add-todo",
    components: <TodoAddEdit />,
  },
  editTodo: {
    exact: true,
    path: "/edit-todo",
    components: <TodoAddEdit />,
  },
};

export default appRouting;
