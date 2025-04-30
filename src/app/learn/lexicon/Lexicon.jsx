import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAyah, fetchVocabularies } from "../../../api/endpoint";
import Divider from "../../../component/element/Divider";
import Button from "../../../component/element/Button";
import MainTitle from "../../../component/element/MainTitle";
import Loading from "../../loading/Loading";
import Vocabulary from "../../../component/fragment/Vocabulary";
import Label from "../../../component/element/Label";
import Error from "../../error/Error";
const Lexicon = () => {
  const { ayah, surah } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: loadingVocabularies,
    data: vocabularies,
    isError: errorVocabulary,
  } = useQuery({
    queryFn: () => fetchVocabularies(surah, ayah),
    queryKey: [`vocab-${surah}/${ayah}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const {
    isError: errorAyah,
    isLoading: loadingAyah,
    data: ayahData,
  } = useQuery({
    queryFn: () => fetchAyah(surah, ayah),
    queryKey: [`ayah-${surah}/${ayah}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  if (loadingVocabularies || loadingAyah) return <Loading />;
  if (errorVocabulary || errorAyah)
    return (
      <Error
        message={"Something when wrong, please try again"}
        onReload={() => location.reload()}
      />
    );

  return (
    <div>
      <div className="flex flex-col px-4 md:px-16 text-on-secondary">
        <div className="self-center mt-2">
          <MainTitle>{`Lexicon [ ${surah}:${ayah} ]`}</MainTitle>
        </div>
        <div className="mt-4">
          <div>
            <p
              style={{ direction: "rtl" }}
              className="text-xl font-scheherazade">
              {ayahData?.ayah.teksArab}
            </p>
            <Divider />
          </div>
          <div className="mt-2">
            <Label>Terdiri dari {ayahData?.length} kata :</Label>
            <div className="mt-2 flex flex-row-reverse flex-wrap gap-1">
              {vocabularies?.map((vocab, i) => (
                <Vocabulary
                  key={i}
                  arabic={vocab.arab}
                  indonesia={vocab.indonesia}
                />
              ))}
            </div>
            <Divider />
          </div>
          <div className="mt-2">
            <Label>Terjemahan indah:</Label>
            <p className="text-right mt-2 italic">
              {ayahData?.ayah.teksIndonesia}
            </p>
            <Divider />
          </div>
          <div className="text-right mt-8">
            <Button onClick={() => navigate("exam")}>Mark as Done</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lexicon;
