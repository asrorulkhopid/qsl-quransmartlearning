import React from "react";

const MenuItem = ({ title, onClick }) => {
  return (
    <li
      className="px-4 py-2 cursor-pointer rounded hover:bg-primary-variant hover:font-bold sm:hover:font-normal"
      onClick={onClick}>
      {title}
      <button></button>
    </li>
  );
};

export default MenuItem;
