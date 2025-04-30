import React from "react";
import Button from "../../component/element/Button";

const Error = ({ message, onReload }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p>{message}</p>
      <Button onClick={onReload}>Reload</Button>
    </div>
  );
};

export default Error;
