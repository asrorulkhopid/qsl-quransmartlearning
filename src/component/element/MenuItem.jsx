import React from "react";

const MenuItem = (props) => {
  const { children, onClick } = props;
  return (
    <li
      className="px-4 py-2 cursor-pointer rounded hover:bg-primary-variant hover:font-bold sm:hover:font-normal"
      onClick={onClick}>
      {children}
    </li>
  );
};

export default MenuItem;
