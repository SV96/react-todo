import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";

import { deleteTodoAction } from "../Redux/actions/action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteTodoDialog = (props) => {
  const dispatch = useDispatch();

  const deleteTodo = () => {
    dispatch(deleteTodoAction({ id: props.todoDeleteData.id }));
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.todoDeleteData.dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>Are , you sure you want to delete todo ?</DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={() => deleteTodo()}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteTodoDialog;
