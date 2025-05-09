import React from "react";

const Vocabulary = (props) => {
  const { arabic, indonesia } = props;
  return (
    <div className="p-1 flex flex-col items-center bg-gradient-to-b from-secondary to-secondary-variant rounded-xs cursor-pointer shadow-sm shadow-surface">
      <div className="font-scheherazade text-on-secondary text-xl">
        <p> {arabic} </p>
      </div>
      <div className="font-sans font-normal text-on-secondary">
        <hr className="text-on-secondary mt-2" />
        <p> {indonesia} </p>
      </div>
    </div>
  );
};

export default Vocabulary;
