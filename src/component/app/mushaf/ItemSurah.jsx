import React from "react";

const ItemSurah = ({ surahNumber, surahName }) => {
  return (
    <div className="p-1 flex  bg-gradient-to-r from-indigo-200 to-gray-100 cursor-pointer">
      <div className="w-10 bg-gradient-to-r from-slate-100 to-indigo-300 flex justify-center items-center text-shadow-white text-shadow-xs">
        {surahNumber}
      </div>
      <div className="px-1 py-1 grow ">{surahName}</div>
    </div>
  );
};

export default ItemSurah;
