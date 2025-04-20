import React from "react";

const MenuItem = ({ title, onClick }) => {
  return (
    <li
      className="px-4 py-2 cursor-pointer rounded hover:bg-slate-500"
      onClick={onClick}>
      {title}
      <button></button>
    </li>
  );
};

export default MenuItem;
