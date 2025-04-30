import React from "react";

const Button = (props) => {
  const { onClick, children } = props;
  return (
    <button
      onClick={onClick}
      className="bg-accent px-4 py-2 text-on-primary rounded-md shadow-xs hover:shadow-md hover:font-semibold shadow-accent cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
