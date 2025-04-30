import React from "react";

const Dot = ({ onClick, active }) => {
  return (
    <div
      onClick={() => onClick}
      className={`h-2  rounded-full cursor-pointer ${
        active ? "w-6 bg-accent" : "w-2 bg-surface"
      } transition-all duration-300`}></div>
  );
};

export default Dot;
