import React from "react";
import Button from "../button/Button";

const Error = ({ message, onReload }) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p>{message}</p>
      <Button onClick={onReload} title={"Reload"} />
    </div>
  );
};

export default Error;
