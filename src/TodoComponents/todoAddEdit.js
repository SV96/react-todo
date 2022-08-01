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
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { gender, hobby, status } from "../constants/todoConstants";
import todoStyles from "../Styles/todoAppStyles";
import { addTodoAction, editTodoAction } from "../Redux/actions/action";
import appRouting from "../constants/routingConstants";
import ErrorMsg from "./errorMsg";

const TodoAddEdit = () => {
  const [todoData, setTodoData] = useState({
    userName: "",
    gender: "",
    hobby: [],
    age: "",
    taskData: null,
    taskName: "",
    taskStatus: "",
  });

  const [formStatus, setFormStatus] = useState();

  const [formError, setFormError] = useState({});

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

  // grabs every filed change value and set state
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

  const handleFormError = () => {
    let tempFormError = {};
    if (todoData.userName === "") {
      tempFormError["userNameError"] = "* User name is required";
    }
    if (todoData.gender === "") {
      tempFormError["genderError"] = "* Select gender";
    }
    if (todoData.hobby.length === 0) {
      tempFormError["hobbyError"] = "* Select hobby";
    }

    if (todoData.age === "") {
      tempFormError["ageError"] = "* Select age";
    }

    if (todoData.taskData === null) {
      tempFormError["taskDateError"] = "* Select date";
    }

    if (todoData.taskName === "") {
      tempFormError["taskNameError"] = "* Task name required";
    }
    if (todoData.taskStatus === "") {
      tempFormError["taskStatusError"] = "* Select task status";
    }
    let errorDecider = Object.keys(tempFormError).length > 0 ? false : true;
    setFormError(tempFormError);
    return errorDecider;
  };

  // decided weather to use add reducer or edit
  const handleDecideReducer = () => {
    if (handleFormError() && formStatus.isAdd) {
      addTodoReducer();
    } else if (handleFormError()) {
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

  // used to set value in field to edit
  const fillDataEdit = (id) => {
    setTodoData(allTodos[id]);
    handleFormStatus("Edit Todo", false, "Edit");
  };

  const redirectBack = () => {
    history.push(appRouting.app.path);
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
          <ArrowBackIcon onClick={(e) => redirectBack()} />
          <Box sx={todoStyles.todoAppBoxFour}>
            <Typography variant="h5" component="h2">
              {formStatus?.formHeader}
            </Typography>
          </Box>
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
                <ErrorMsg fieldError={formError?.userNameError} />
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
                <ErrorMsg fieldError={formError?.genderError} />
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
                <ErrorMsg fieldError={formError?.hobbyError} />
              </div>
            </Box>

            {/* age */}
            <Box sx={todoStyles.styleBox}>
              <label>Age:</label>
              <div style={todoStyles.rightDivStyles}>
                <Slider
                  value={todoData.age || 21}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={18}
                  max={55}
                  onChange={(e) => handleFiledChage(e, "age")}
                />
                <ErrorMsg fieldError={formError?.ageError} />
              </div>
            </Box>

            {/* date  */}
            <Box sx={todoStyles.styleBox}>
              <label>Date:</label>
              <div style={todoStyles.rightDivStyles}>
                <DatePicker
                  selected={
                    todoData.taskData !== null
                      ? new Date(todoData.taskData)
                      : null
                  }
                  onChange={(date) => handleFiledChage(date, "taskData")}
                />
                <ErrorMsg fieldError={formError?.taskDateError} />
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
                <ErrorMsg fieldError={formError?.taskNameError} />
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
                <ErrorMsg fieldError={formError?.taskStatusError} />
              </div>
            </Box>
          </Stack>
          {/* submit button  */}
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
