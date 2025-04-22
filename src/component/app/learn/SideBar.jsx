import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchListSurah } from "../../../api/endpoint";
import { useNavigate } from "react-router-dom";
import Utils from "../../../utils/Utils";

const menus = [
  {
    id: 1,
    name: "Lexicon",
  },
  {
    id: 2,
    name: "Morphologi",
  },
  {
    id: 3,
    name: "Phrase",
  },
];

const morphMenus = [
  { id: 1, name: "Materi 1", path: "materi-1" },
  { id: 2, name: "Materi 2", path: "materi-2" },
  { id: 3, name: "Materi 3", path: "materi-3" },
];

const phraseMenus = [
  { id: 1, name: "Materi 1", path: "materi-1" },
  { id: 2, name: "Materi 2", path: "materi-2" },
  { id: 3, name: "Materi 3", path: "materi-3" },
];

const SideBar = ({ setIsCollapse }) => {
  const renderSubMenu = (
    expandedMenu,
    expanddedSurah,
    lexMenus,
    morphMenus,
    phraseMenus
  ) => {
    let subMenuItem = [];
    switch (expandedMenu) {
      case menus[0]:
        subMenuItem = (
          <ul className="m-1 p-1 bg-slate-800 flex flex-col">
            {lexMenus.map((surah) => (
              <li
                key={surah.namaLatin}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedSurah((prev) => (prev === surah ? null : surah));
                }}
                className="p-1 hover:bg-slate-600">
                {surah.namaLatin}
                {expanddedSurah === surah && (
                  <ul className="ml-6 list-disc">
                    {Array.from(
                      { length: surah.jumlahAyat },
                      (_, i) => i + 1
                    ).map((ayahNumber) => (
                      <li
                        key={ayahNumber}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate("lexicon", surah.nomor, ayahNumber);
                          if (Utils.isUnderScreenWidth(640))
                            setIsCollapse(true);
                        }}
                        className="py-1.5 hover:text-indigo-300">{`Ayat : ${ayahNumber}`}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        );

        break;
      case menus[1]:
        subMenuItem = (
          <ul className="p-1 bg-slate-800 flex flex-col gap-1">
            {morphMenus.map((menu) => (
              <li
                key={menu.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("morphologi", menu.path);
                  if (Utils.isUnderScreenWidth(640)) setIsCollapse(true);
                }}
                className="p-1 hover:bg-slate-600">
                {menu.name}
              </li>
            ))}
          </ul>
        );
        break;
      case menus[2]:
        subMenuItem = (
          <ul className="p-1 bg-slate-800 flex flex-col gap-1">
            {phraseMenus.map((menu) => (
              <li
                key={menu.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("morphologi", menu.path);
                  if (Utils.isUnderScreenWidth(640)) setIsCollapse(true);
                }}
                className="p-1 hover:bg-slate-600">
                {menu.name}
              </li>
            ))}
          </ul>
        );

        break;
      default:
        subMenuItem = [];
    }

    return subMenuItem;
  };

  const handleNavigate = (mainMenu, subMenu, detailMenu) => {
    navigate(
      `/learn/${mainMenu}/${subMenu}${detailMenu ? `/${detailMenu}` : ""}`
    );
  };

  const navigate = useNavigate();
  const { data } = useQuery({
    queryFn: fetchListSurah,
    queryKey: ["list-surah"],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedSurah, setExpandedSurah] = useState(null);

  return (
    <div className="h-full bg-gradient-to-br from-slate-800 to-slate-700 overflow-y-scroll no-scrollbar text-white">
      <ul className="p-2 flex flex-col gap-2">
        {menus.map((menu) => (
          <li
            key={menu.id}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedMenu((prev) => (prev === menu ? null : menu));
            }}
            className="p-1 bg-slate-600 rounded-xs flex flex-col items-stretch cursor-pointer hover:bg-slate-500">
            <div className="p-1">{menu.name}</div>
            {expandedMenu === menu &&
              renderSubMenu(
                expandedMenu,
                expandedSurah,
                data?.data,
                morphMenus,
                phraseMenus
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
