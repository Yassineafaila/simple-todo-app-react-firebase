import React from "react";
import "./Input.css";
function Input({
  type,
  placeholder,
  value,
  HandlerChange,
  name,
  className,
  error,
  children,
  label
}) {
  return (
    <>
      <div className="input-container d-flex flex-column gap-1 ">
        {label && <label>{label}</label>}
        <div
          className={`d-flex border rounded py-2 px-3 border-light-subtle w-100 align-items-center gap-2 ${
            error ? "error" : ""
          }`}
        >
          {children}
          <input
            type={type}
            name={name}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={HandlerChange}
          ></input>
        </div>
        {error && <p className={`${error ? "error" : ""}`}>{error}</p>}
      </div>
    </>
  );
}

export default Input;
