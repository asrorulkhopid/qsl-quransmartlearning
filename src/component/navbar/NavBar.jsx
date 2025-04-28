import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

const NavBar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const navigate = useNavigate();
  const menus = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Mushaf",
      link: "/mushaf",
    },
    {
      name: "Learn",
      link: "/learn",
    },
    {
      name: "Guidance",
      link: "/guidance",
    },
  ];

  function handleMenuClick(menu) {
    if (menu.link === "/learn" && !location.href.includes(menu.link)) {
      navigate("/learn/lexicon/1/1");
    } else if (!location.href.includes(menu.link)) navigate(menu.link);
    setIsCollapse(true);
  }

  return (
    <div className="bg-primary text-on-primary shadow-sm shadow-primary-variant px-4 sm:px-12 py-2 flex justify-between items-center ">
      <div>
        <a href="/" className="font-bold text-3xl sm:text-3xl">
          Q-SL
        </a>
      </div>
      <div className="relative">
        <div
          onClick={() => setIsCollapse(!isCollapse)}
          className="sm:hidden cursor-pointer text-2xl">
          ☰
        </div>
        <div>
          <ul
            className={` rounded-bl-md bg-primary-variant sm:bg-transparent -mr-2 p-2 flex gap-2 flex-col sm:flex-row absolute sm:relative top-10.5 sm:top-0 ${
              isCollapse ? "-right-40 sm:right-0 hidden sm:flex" : "-right-2"
            }`}>
            {menus.map((menu) => (
              <MenuItem
                key={menu.name}
                title={menu.name}
                onClick={() => handleMenuClick(menu)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
