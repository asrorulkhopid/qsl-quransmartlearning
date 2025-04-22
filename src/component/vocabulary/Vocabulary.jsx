import React from "react";

const Vocabulary = ({ arabic, indonesia }) => {
  return (
    <div className="p-1 flex flex-col items-center bg-gradient-to-b from-indigo-400 to-slate-200 rounded-xs cursor-pointer">
      <div className="font-scheherazade text-white text-2xl">
        <p> {arabic} </p>
      </div>
      <div className="text-xs">
        <p> {indonesia} </p>
      </div>
    </div>
  );
};

export default Vocabulary;
