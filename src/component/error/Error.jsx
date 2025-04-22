import React from "react";

const Error = ({ message }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p>{message}</p>
      <button
        onClick={() => location.reload()}
        className="p-2 mt-2 text-white rounded-md bg-indigo-900 hover:shadow-md shadow-slate-600 cursor-pointer">
        Reload page
      </button>
    </div>
  );
};

export default Error;
