import React from "react";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";

function Alert({ content }) {
  return (
    <IconContext.Provider value={{ size: "1.5rem" }}>
      <div className="alert">
        <span>{content}</span>
        <span
          onClick={(event) => {
            event.currentTarget.parentElement.style.display = "none";
          }}
        >
          <MdClose />
        </span>
      </div>
    </IconContext.Provider>
  );
}

export default Alert;
