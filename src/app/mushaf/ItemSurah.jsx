import React from "react";

const ItemSurah = ({ surahNumber, surahName }) => {
  return (
    <div className="p-1 flex  bg-surface cursor-pointer">
      <div className="w-10 bg-primary-variant text-on-primary flex justify-center items-center text-shadow-white text-shadow-xs">
        {surahNumber}
      </div>
      <div className="px-1 py-1 grow text-on-secondary  ">{surahName}</div>
    </div>
  );
};

export default ItemSurah;
