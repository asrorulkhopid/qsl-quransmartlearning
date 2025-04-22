import React from "react";

const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="h-6 w-6 border-3 rounded-full border-indigo-800 border-l-transparent animate-spin"></div>
      <p>Load...</p>
    </div>
  );
};

export default Loading;
