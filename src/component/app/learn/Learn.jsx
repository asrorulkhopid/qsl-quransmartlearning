import React, { useState } from "react";
import SideBar from "./SideBar";
import { CgChevronDoubleLeft, CgChevronDoubleRight } from "react-icons/cg";
import { Route, Routes } from "react-router-dom";
import Lexicon from "./lexicon/Lexicon";
import LexiconTest from "./lexicon/LexiconTest";

const Learn = () => {
  const [isCollapse, setIsCollapse] = useState(
    window.innerWidth < 640 ? true : false
  );
  return (
    <div
      onClick={() => {
        if (window.innerWidth < 640) setIsCollapse(true);
      }}
      className="h-full relative">
      <div className="h-full w-full flex">
        <div
          onClick={(e) => e.stopPropagation()}
          className={`z-30 h-full absolute sm:relative transition-all ease-in-out duration-300 ${
            isCollapse ? "w-0" : " w-9/12 sm:w-64"
          }`}>
          <SideBar setIsCollapse={setIsCollapse} />
        </div>
        <div className="absolute z-40 h-full w-2 ">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapse(!isCollapse);
            }}
            className="absolute top-1/2 -left-1 rounded-xs h-8 w-6 text-white bg-slate-900 shadow-xs shadow-white flex items-center justify-center">
            {isCollapse ? <CgChevronDoubleRight /> : <CgChevronDoubleLeft />}
          </div>
        </div>
        <div className="grow">
          <div className="h-full">
            <Routes>
              <Route path="lexicon/:surah/:ayah" element={<Lexicon />} />
              <Route
                path="lexicon/:surah/:ayah/exam"
                element={<LexiconTest />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
