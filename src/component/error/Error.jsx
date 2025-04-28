import React from "react";

const Error = ({ message, onReload }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p>{message}</p>
      <button
        onClick={() => onReload()}
        className="p-2 mt-2 text-surface rounded-md bg-accent hover:shadow-md shadow-accent cursor-pointer">
        Reload page
      </button>
    </div>
  );
};

export default Error;
