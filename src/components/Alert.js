import React from "react";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";

function Alert({ content, show, setShow }) {
  return (
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <div className="alert" style={{ display: show ? "flex" : "none" }}>
        <span>{content}</span>
        <span
          onClick={() => {
            setShow(false);
          }}
        >
          <MdClose />
        </span>
      </div>
    </IconContext.Provider>
  );
}

export default Alert;
