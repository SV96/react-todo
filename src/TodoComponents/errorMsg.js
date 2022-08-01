import React, { useState, useEffect, Fragment } from "react";

const ErrorMsg = (props) => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <small style={{ display: "block", marginTop: "10px", color: "red" }}>
          {props.fieldError}
        </small>
      </div>
    </>
  );
};

export default ErrorMsg;
