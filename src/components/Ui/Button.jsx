import React from 'react'

function Button({ type, HandlerClick, children,className }) {
  return (
    <button type={type} className={className} onClick={HandlerClick}>
      {children}
    </button>
  );
}

export default Button