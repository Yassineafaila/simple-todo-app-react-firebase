import React from "react";

function Input({ type, placeholder, value, HandlerChange, name, className,error }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={HandlerChange}
      ></input>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Input;
