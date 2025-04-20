import React from "react";
import ItemSurah from "./ItemSurah";
import { useQuery } from "@tanstack/react-query";
import { fetchListSurah } from "../../../api/endpoint";
import Label from "../../label/Label";
import { useNavigate } from "react-router-dom";

const Mushaf = () => {
  const navigate = useNavigate();
  const handleOnClick = (surahNumber) => {
    navigate(`surah/${surahNumber}`);
  };

  const { isError, data, isLoading } = useQuery({
    queryFn: fetchListSurah,
    queryKey: ["list-surah"],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isLoading) return <p className="text-black">Loading...</p>;
  if (isError) return <p>Error - {isError}</p>;

  return (
    <div className="pb-4 overflow-y-scroll px-4 sm:px-8 md:px-24 no-scrollbar">
      <div className="flex flex-col">
        <div className="mt-2 self-center">
          <Label title="Daftar Surah" />
        </div>
        <div className="mt-2 max-h-full grid grid-flow-col grid-rows-144 sm:grid-rows-57 lg:grid-rows-38 gap-2">
          {data?.data.map((surah) => (
            <div key={surah.nomor} onClick={() => handleOnClick(surah.nomor)}>
              <ItemSurah
                surahNumber={surah.nomor}
                surahName={surah.namaLatin}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mushaf;
