import React from "react";

const Label = (props) => {
  const { children } = props;
  return <p className="font-semibold text-on-secondary/70">{children}</p>;
};

export default Label;
