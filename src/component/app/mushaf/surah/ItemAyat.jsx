import React from "react";
import { CgPlayButton, CgPlayPause } from "react-icons/cg";

const ItemAyat = ({
  number,
  ayat,
  translation,
  teksLatin,
  isPlaying,
  onPlayPause,
}) => {
  return (
    <div className={`px-2 text-slate-700 ${isPlaying ? "bg-indigo-100" : ""}`}>
      <div className="flex justify-end">
        <div>
          <div className="py-2">
            <p
              className="text-right text-2xl leading-14 font-scheherazade font-extralight sm:text-2xl"
              style={{ direction: "rtl" }}>
              <span className="ml-2">{ayat}</span>
            </p>
          </div>
          <p className="text-right italic text-indigo-800">{teksLatin}</p>
          <p className="mt-2 text-right">{translation}</p>
        </div>
        <div className="ml-1 mt-5">
          <div className="text-xl w-10 text-center rounded bg-gradient-to-br from-indigo-200 to-slate-200 font-scheherazade">
            {number}
          </div>
          <div className="mt-2 flex justify-center border border-indigo-400 p-1 rounded-full cursor-pointer">
            {isPlaying ? (
              <CgPlayPause onClick={onPlayPause} />
            ) : (
              <CgPlayButton onClick={onPlayPause} />
            )}
          </div>
        </div>
      </div>
      <hr className="text-indigo-400" />
    </div>
  );
};

export default ItemAyat;
