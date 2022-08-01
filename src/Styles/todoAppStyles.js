const todoStyles = {
  todoAppBoxOne: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  todoAppBoxTwo: {
    bgcolor: "#9cd9a2",
    borderRadius: 2,
    minWidth: 300,
    width: "80vw",
    height: "80vh",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    p: "4rem 2rem",
    overflowY: "auto",
  },
  todoAppBoxThree: {
    display: "flex",
    justifyContent: "flex-end",
  },
  todoAppBoxFour: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#b8f589",
    mb: "25px",
    mt: "10px",
  },
  styleBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 3rem",

    "& + .MuiBox-root ": {
      borderTop: "2px dashed #b5e2b9",
    },
  },
  InputStyles: {
    all: "unset",
    boxSizing: "border-box",
    font: "inherit",
    fontSize: "1rem",
    padding: ".5rem",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: ".5rem",
    display: "block",
    width: "100%",
  },
  rightDivStyles: {
    display: "flex",
    justifyContent: "flex-start",
    width: "300px",
    flexWrap: "wrap",
  },
};

export default todoStyles;
