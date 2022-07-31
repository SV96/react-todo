import React, { useState, useEffect, Fragment } from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { gender, hobby, status } from "../constants/todoConstants";
import todoStyles from "../Styles/todoAppStyles";
import { addTodoAction, editTodoAction } from "../Redux/actions/action";
import appRouting from "../constants/routingConstants";

const TodoAddEdit = () => {
  const [todoData, setTodoData] = useState({
    userName: "",
    gender: "",
    hobby: [],
    age: "",
    taskData: new Date(),
    taskName: "",
    taskStatus: "",
  });

  const [formStatus, setFormStatus] = useState();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const allTodos = useSelector((state) => state.todoReducer.todos);

  const handleUserName = (e) => {
    e.target.value = e.target.value.replace(/[^A-Za-z ']/, "");
    if (e.target.value.length < 15) {
      setTodoData({ ...todoData, userName: e.target.value });
    } else {
      e.target.value = e.target.value.replace(
        new RegExp(e.target.value[15] + "$"),
        ""
      );
    }
  };

  const handleHobby = (e) => {
    const todoTemp = { ...todoData };
    let hobbyTemp = todoTemp.hobby;
    if (e.target.checked) {
      hobbyTemp.push(e.target.value);
    } else {
      let removeIndex = hobbyTemp.indexOf(e.target.value);
      hobbyTemp.splice(removeIndex, 1);
    }
    setTodoData(todoTemp);
  };

  const handleFiledChage = (e, filedName) => {
    if (filedName === "taskStatus") {
      setTodoData({ ...todoData, taskStatus: e.value });
    } else if (filedName === "taskData") {
      setTodoData({ ...todoData, taskData: e });
    } else if (filedName === "hobby") {
      handleHobby(e);
    } else if (filedName === "userName") {
      handleUserName(e);
    } else {
      setTodoData({ ...todoData, [filedName]: e.target.value });
    }
  };

  const addTodoReducer = () => {
    dispatch(addTodoAction(todoData));
    history.push(appRouting.app.path);
  };

  const editTodoReducer = () => {
    dispatch(editTodoAction({ id: location.state.id, todoData: todoData }));
    history.push(appRouting.app.path);
  };

  const handleDecideReducer = () => {
    if (formStatus.isAdd) {
      addTodoReducer();
    } else {
      editTodoReducer();
    }
  };

  const handleFormStatus = (header, addDecide, btnCta) => {
    setFormStatus({
      formHeader: header,
      isAdd: addDecide,
      submitBtnCta: btnCta,
    });
  };

  const fillDataEdit = (id) => {
    setTodoData(allTodos[id]);
    handleFormStatus("Edit Todo", false, "Edit");
  };

  useEffect(() => {
    if (new URL(window.location.href).pathname.includes("edit")) {
      fillDataEdit(location.state.id);
    } else {
      handleFormStatus("Add Todo", true, "Add");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box sx={todoStyles.todoAppBoxOne}>
        <Box sx={todoStyles.todoAppBoxTwo}>
          <Stack
            spacing={3}
            sx={{
              alignItems: "stretch",
              width: "90%",
              maxWidth: "700px",
              marginInline: " auto",
            }}
          >
            {/* user name  */}
            <Box sx={todoStyles.styleBox}>
              <div>
                <label>User name:</label>
              </div>
              <div style={todoStyles.rightDivStyles}>
                <input
                  style={todoStyles.InputStyles}
                  type="text"
                  name="user name"
                  value={todoData.userName}
                  onChange={(e) => handleFiledChage(e, "userName")}
                />
              </div>
            </Box>

            {/* gender  */}
            <Box sx={todoStyles.styleBox}>
              <label>Gender:</label>
              <div style={todoStyles.rightDivStyles}>
                {gender.map((genderValue, index) => {
                  return (
                    <Fragment key={index}>
                      <label htmlFor={genderValue}>
                        <input
                          id={genderValue}
                          type="radio"
                          value={genderValue}
                          checked={todoData.gender === genderValue}
                          name="todoGender"
                          onChange={(e) => handleFiledChage(e, "gender")}
                        />
                        {genderValue}
                      </label>
                    </Fragment>
                  );
                })}
              </div>
            </Box>

            {/* hobby      */}
            <Box sx={todoStyles.styleBox}>
              <label>Hobby:</label>
              <div style={todoStyles.rightDivStyles}>
                {hobby.map((hobbyValue, index) => {
                  return (
                    <Fragment key={index}>
                      <label htmlFor={hobbyValue}>
                        <input
                          id={hobbyValue}
                          type="checkbox"
                          checked={todoData.hobby.includes(hobbyValue)}
                          value={hobbyValue}
                          onChange={(e) => handleFiledChage(e, "hobby")}
                        />
                        {hobbyValue}
                      </label>
                    </Fragment>
                  );
                })}
              </div>
            </Box>

            {/* date  */}
            <Box sx={todoStyles.styleBox}>
              <label>Date:</label>
              <div style={todoStyles.rightDivStyles}>
                <DatePicker
                  selected={new Date(todoData.taskData)}
                  onChange={(date) => handleFiledChage(date, "taskData")}
                />
              </div>
            </Box>

            {/* task  */}
            <Box sx={todoStyles.styleBox}>
              <label>Task:</label>
              <div style={todoStyles.rightDivStyles}>
                <input
                  type="text"
                  style={todoStyles.InputStyles}
                  name="task"
                  value={todoData.taskName}
                  onChange={(e) => handleFiledChage(e, "taskName")}
                />
              </div>
            </Box>

            {/* status  */}
            <Box sx={todoStyles.styleBox}>
              {" "}
              <label>Status:</label>
              <div className="select-holder" style={todoStyles.rightDivStyles}>
                <Select
                  style={{ widh: "100%" }}
                  options={status}
                  onChange={(e) => handleFiledChage(e, "taskStatus")}
                  value={status.filter(
                    (option) => option.value === todoData.taskStatus
                  )}
                />
              </div>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Button variant="contained" onClick={() => handleDecideReducer()}>
              {formStatus?.submitBtnCta}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TodoAddEdit;
