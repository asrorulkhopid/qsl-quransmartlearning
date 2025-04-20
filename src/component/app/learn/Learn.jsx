import React from "react";
import SideBar from "./SideBar";
import { CgChevronDoubleRight } from "react-icons/cg";

const Learn = () => {
  return (
    <div className="h-full">
      <div className="h-full w-full sm:w-54 flex bg-red-500">
        <div className="h-full w-9/12 sm:w-52">
          <SideBar />
        </div>
        <div className="relative h-full w-2 bg-slate-900">
          <div className="absolute top-1/2 -left-2 rounded-xs h-8 w-6 text-white bg-slate-900 flex items-center justify-center">
            <CgChevronDoubleRight />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-black grow"></div>
      </div>
    </div>
  );
};

export default Learn;
