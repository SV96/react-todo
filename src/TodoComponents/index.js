import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";

import DeleteTodoDialog from "./todoDeleteDialog";
import appRouting from "../constants/routingConstants";
import { todoHeader } from "../constants/todoConstants";
import todoStyles from "../Styles/todoAppStyles";

const TodoApp = () => {
  const [todoDeleteData, setTodoDeleteData] = useState({
    dialogOpen: false,
    id: "",
  });

  const history = useHistory();
  const allTodos = useSelector((state) => state.todoReducer.todos);

  const handleClickOpen = (id) => {
    setTodoDeleteData({ dialogOpen: true, id: id });
  };

  const handleClose = () => {
    setTodoDeleteData({ dialogOpen: false, id: "" });
  };

  const redirectAddPage = () => {
    history.push(appRouting.addTodo.path);
  };

  const redirectEditPage = (id) => {
    history.push({
      pathname: appRouting.editTodo.path,
      state: { id: id },
    });
  };

  return (
    <>
      <Box sx={todoStyles.todoAppBoxOne}>
        <Box sx={todoStyles.todoAppBoxTwo}>
          <Box sx={todoStyles.todoAppBoxFour}>
            <Typography variant="h4" component="h2">
              React Todo App
            </Typography>
          </Box>
          <Box sx={todoStyles.todoAppBoxThree}>
            <Button variant="contained" onClick={() => redirectAddPage()}>
              Add
            </Button>
          </Box>

          {Object.keys(allTodos).length > 0 ? (
            <TableContainer component={Paper} sx={{ mt: "2rem" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {todoHeader.map((todoHederValue, index) => {
                      return (
                        <TableCell key={index}>{todoHederValue}</TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(allTodos)?.map(([key, value]) => {
                    return (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {value?.userName}
                        </TableCell>
                        <TableCell> {value?.gender}</TableCell>
                        <TableCell>{value?.hobby.toString()}</TableCell>
                        <TableCell>{value?.age}</TableCell>
                        <TableCell>
                          {moment(value?.taskData).format("MMM Do YY")}
                        </TableCell>
                        <TableCell>{value?.taskName}</TableCell>
                        <TableCell>{value?.taskStatus}</TableCell>
                        <TableCell>
                          <IconButton>
                            <EditIcon onClick={() => redirectEditPage(key)} />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon onClick={() => handleClickOpen(key)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box>
              <Typography variant="h5" component="h2" align="center">
                Please add todos
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <DeleteTodoDialog
        todoDeleteData={todoDeleteData}
        setTodoDeleteData={setTodoDeleteData}
        handleClose={handleClose}
      />
    </>
  );
};

export default TodoApp;
