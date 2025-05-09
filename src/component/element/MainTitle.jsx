import React from "react";

const MainTitle = (props) => {
  const { children } = props;
  return (
    <div className="flex items-center bg-primary-variant border border-primary-variant">
      <div className="w-4 h-6 bg-transparent bg-[url(/assets/label-l.svg)] bg-center bg-contain"></div>
      <div className="px-4 py-1 font-medium bg-surface text-on-secondary">
        {children}
      </div>
      <div className="w-4 h-6 bg-transparent bg-[url(/assets/label-r.svg)] bg-center bg-contain"></div>
    </div>
  );
};

export default MainTitle;
