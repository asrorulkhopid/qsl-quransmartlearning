import React, { useEffect, useState } from "react";

const Banner = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    console.log(activeIndex);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-11/12 h-52 sm:w-10/12 sm:h-80 md:w-8/12 lg:w-6/12 overflow-hidden rounded-xl bg-slate-400">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={`/assets/${img}`}
              alt={`Banner ${index}`}
              className="w-full h-full object-fill flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2  rounded-full ${
              index === activeIndex ? "w-6 bg-white" : "w-2 bg-slate-800"
            } transition-all duration-300`}></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
