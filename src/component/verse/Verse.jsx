import React from "react";
import { CgPlayButton, CgPlayPause } from "react-icons/cg";
import Utils from "../../utils/Utils";
import Divider from "../divider/Divider";

const Verse = ({ verse, isPlaying, onPlayPause }) => {
  return (
    <div
      className={`px-2 text-on-secondary ${isPlaying ? "bg-primary/10" : ""}`}>
      <div className="flex justify-end">
        {/* verse & translation */}
        {console.log("verse - log", verse)}

        <div>
          <div className="py-2">
            <p
              className="font-scheherazade text-right text-2xl sm:text-2xl font-extralight leading-14"
              style={{ direction: "rtl" }}>
              <span className="ml-2">{verse.teksArab}</span>
            </p>
          </div>
          <p className="text-right italic text-accent">{verse.teksLatin}</p>
          <p className="mt-2 text-right">{verse.teksIndonesia}</p>
        </div>

        {/* number & control */}
        <div className="ml-1 mt-5">
          <div className="text-xl w-10 rounded bg-secondary text-on-secondary text-center font-scheherazade">
            {Utils.convertLatinNumbertoArabic(verse.nomorAyat)}
          </div>
          <div className="flex justify-center mt-2 border border-secondary p-1 rounded-full cursor-pointer text-secondary ">
            {isPlaying ? (
              <CgPlayPause onClick={onPlayPause} />
            ) : (
              <CgPlayButton onClick={onPlayPause} />
            )}
          </div>
        </div>
      </div>
      {/* divider */}
      <Divider />
    </div>
  );
};

export default Verse;
