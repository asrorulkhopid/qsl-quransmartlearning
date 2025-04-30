import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchListSurah } from "../../api/endpoint";
import { useLocation, useNavigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import Loading from "../loading/Loading";
import Error from "../error/Error";

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
  { id: 1, name: "Materi 1" },
  { id: 2, name: "Materi 2" },
  { id: 3, name: "Materi 3" },
];

const phraseMenus = [
  { id: 1, name: "Materi 1" },
  { id: 2, name: "Materi 2" },
  { id: 3, name: "Materi 3" },
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
          <ul className="ml-2 p-1 flex flex-col">
            {lexMenus.map((surah) => (
              <div key={surah.namaLatin}>
                <li
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedSurah((prev) => (prev === surah ? null : surah));
                  }}
                  className={`p-1 hover:bg-primary cursor-pointer ${
                    section[2] === menus[0].name.toLowerCase() &&
                    surah.nomor == section[3]
                      ? "border-l-4 border-on-secondary"
                      : "border-secondary-variant"
                  }`}>
                  {surah.namaLatin}
                </li>
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
                        className={`py-1.5 hover:text-primary cursor-pointer ${
                          section[2] == menus[0].name.toLowerCase() &&
                          surah.nomor == section[3] &&
                          ayahNumber == section[4]
                            ? "font-bold text-primary"
                            : ""
                        }`}>{`Ayat : ${ayahNumber}`}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        );

        break;
      case menus[1]:
        subMenuItem = (
          <ul className="ml-2 p-1 flex flex-col gap-1">
            {morphMenus.map((menu) => (
              <li
                key={menu.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("morphologi", menu.id);
                  if (Utils.isUnderScreenWidth(640)) setIsCollapse(true);
                }}
                className={`p-1 hover:bg-primary cursor-pointer ${
                  section[2] === menus[1].name.toLowerCase() &&
                  menu.id == section[3]
                    ? "border-l-4 border-on-secondary"
                    : ""
                }`}>
                {menu.name}
              </li>
            ))}
          </ul>
        );
        break;
      case menus[2]:
        subMenuItem = (
          <ul className="ml-2 p-1 flex flex-col gap-1">
            {phraseMenus.map((menu) => (
              <li
                key={menu.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("phrase", menu.id);
                  if (Utils.isUnderScreenWidth(640)) setIsCollapse(true);
                }}
                className={`p-1 hover:bg-primary cursor-pointer ${
                  section[2] === menus[2].name.toLowerCase() &&
                  menu.id == section[3]
                    ? "border-l-4 border-on-secondary"
                    : ""
                }`}>
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
  const location = useLocation();
  const section = location.pathname.split("/");
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: fetchListSurah,
    queryKey: ["list-surah"],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [expandedMenu, setExpandedMenu] = useState(null);
  const [expandedSurah, setExpandedSurah] = useState(null);

  return (
    <div className="h-full bg-secondary overflow-y-scroll no-scrollbar text-on-secondary">
      {isLoading && <Loading />}
      {isError && <Error message={"Try Again"} onReload={refetch} />}
      {!isLoading && !isError && (
        <ul className="p-2 flex flex-col gap-2">
          {menus.map((menu) => (
            <div key={menu.id}>
              <li
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedMenu((prev) => (prev === menu ? null : menu));
                }}
                className={`p-1 border-l-2 flex flex-col items-stretch cursor-pointer hover:bg-secondary-variant font-medium ${
                  section[2] === menu.name.toLowerCase()
                    ? "border-l-4 border-on-secondary"
                    : "border-secondary-variant"
                }`}>
                <div className="p-1">{menu.name}</div>
              </li>
              {expandedMenu === menu &&
                renderSubMenu(
                  expandedMenu,
                  expandedSurah,
                  data?.data,
                  morphMenus,
                  phraseMenus
                )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SideBar;
