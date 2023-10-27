import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import "./Modal.css";
import Button from "../Ui/button";
import { AiOutlineClose } from "react-icons/ai";
function Modal({ children, message }) {
  const [show, setShow] = useState(false);
  console.log(message)
  useEffect(() => {
    if (message) {
      const time = setTimeout(() => {
        setShow(true);
      });
      return () => {
        clearTimeout(time);
        setShow(false);
      };
    }
  }, [message]);

  if (show) {
    return ReactDom.createPortal(
      <>
        <div className="overlay"></div>
        <div className="modal-box py-2 px-3 d-flex align-items-center justify-content-center">
          {children}
          <Button HandlerClick={() => setShow(false)} className={"border-0 bg-dark text-white rounded"}>
            <AiOutlineClose />
          </Button>
        </div>
      </>,
      document.getElementById("portal")
    );
  }

  return null;
}

export default Modal;
