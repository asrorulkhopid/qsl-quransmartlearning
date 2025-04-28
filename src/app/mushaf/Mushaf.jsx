import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetchListSurah } from "../../api/endpoint";
import Loading from "../../component/loading/Loading";
import Error from "../../component/error/Error";
import Label from "../../component/label/Label";
import ItemSurah from "./ItemSurah";

const Mushaf = () => {
  const navigate = useNavigate();
  const handleOnClick = (surahNumber) => {
    navigate(`/surah/${surahNumber}`);
  };

  const { isError, data, isLoading, refetch } = useQuery({
    queryFn: fetchListSurah,
    queryKey: ["list-surah"],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error
        message={"Someting went wrong, Please try again"}
        onReload={refetch}
      />
    );

  return (
    <div className="pb-2 overflow-y-scroll px-4 sm:px-8 md:px-24 no-scrollbar">
      <div className="flex flex-col">
        <div className="mt-2 self-center">
          <Label title="Daftar Surah" />
        </div>
        <div className="mt-2 columns-1 sm:columns-2 lg:columns-3 gap-2">
          {console.log("ini data", data)}
          {data?.data?.map((surah) => (
            <div
              className="mb-2"
              key={surah.nomor}
              onClick={() => handleOnClick(surah.nomor)}>
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
