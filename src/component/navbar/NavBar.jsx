import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";

const NavBar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const navigate = useNavigate();
  const menus = [
    {
      name: "Home",
      link: "/",
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
    navigate(menu.link);
    setIsCollapse(true);
  }

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white px-4 sm:px-12 py-2 flex justify-between items-center ">
      <div>
        <a href="#" className="font-bold text-2xl sm:text-3xl">
          Q-SL
        </a>
      </div>
      <div className="relative">
        <div
          onClick={() => setIsCollapse(!isCollapse)}
          className="sm:hidden cursor-pointer">
          ☰
        </div>
        <div>
          <ul
            className={`bg-slate-600 sm:bg-transparent -mr-2 p-2 flex gap-2 flex-col sm:flex-row absolute sm:relative top-9 sm:top-0 ${
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
