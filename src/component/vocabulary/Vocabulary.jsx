import React from "react";

const Vocabulary = ({ arabic, indonesia }) => {
  return (
    <div className="p-1 flex flex-col items-center bg-gradient-to-b from-secondary to-secondary-variant rounded-xs cursor-pointer shadow-sm shadow-surface">
      <div className="font-scheherazade text-on-secondary text-xl">
        <p> {arabic} </p>
      </div>
      <div className="font-sans font-normal text-on-secondary">
        <p> {indonesia} </p>
      </div>
    </div>
  );
};

export default Vocabulary;
