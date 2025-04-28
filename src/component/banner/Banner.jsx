import React, { useEffect, useState } from "react";
import Dot from "../dot/Dot";

const Banner = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index) => () => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-11/12 h-64 sm:w-10/12 sm:h-80 md:w-8/12 lg:w-6/12 overflow-hidden rounded-xl bg-secondary-variant">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={`/assets/${img}`}
              alt={`Banner ${index}`}
              className="p-3 w-full h-full object-contain flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, index) => (
          <Dot
            key={index}
            active={index === activeIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
