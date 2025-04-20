import React from "react";

const Label = ({ title }) => {
  return (
    <div className="flex items-center bg-slate-600 border border-slate-600">
      <div className="w-4 h-6 bg-transparent bg-[url(/assets/label-l.svg)] bg-center bg-contain"></div>
      <div className="px-4 font-medium bg-indigo-100 mix-blend-lighten text-shadow-xs text-shadow-white">
        {title}
      </div>
      <div className="w-4 h-6 bg-transparent bg-[url(/assets/label-r.svg)] bg-center bg-contain"></div>
    </div>
  );
};

export default Label;
