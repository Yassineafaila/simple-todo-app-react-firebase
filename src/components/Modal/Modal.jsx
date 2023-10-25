import React from "react";
import  ReactDom  from "react-dom";
import "./Modal.css";
function Modal({ children }) {
  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal-box">
        {children}
      </div>
    </>
  ,document.getElementById("portal"));
}

export default Modal;
