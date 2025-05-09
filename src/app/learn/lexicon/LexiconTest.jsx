import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAyah, fetchLexiconExamData } from "../../../api/endpoint";
import DropArea from "../../../component/dragdrop/DropArea";
import { DndContext } from "@dnd-kit/core";
import Divider from "../../../component/element/Divider";
import Button from "../../../component/element/Button";
import MainTitle from "../../../component/element/MainTitle";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import Label from "../../../component/element/Label";

const LexiconTest = () => {
  const handleCheckBoxChange = (vocab) => {
    const isSelected = selectedVocab.some((v) => v.id === vocab.id);
    isSelected
      ? setSelectedVocab(selectedVocab.filter((v) => v.id !== vocab.id))
      : setSelectedVocab((prev) => [...prev, vocab]);
  };

  const handleDragEnd = (event) => {
    setIsCheck(false);

    const { over, active } = event;

    if (!over) return;

    const itemId = active.id;
    const newAreaId = over.id;

    setShuffledTranslation((prev) => {
      const isExist = prev.find((item) => item.area_id === newAreaId);
      if (isExist) return prev;

      return prev.map((item) =>
        item.id == itemId ? { ...item, area_id: newAreaId } : item
      );
    });
  };

  const handleNavigate = (surah, ayah, isLastAyah) => {
    const nextSurah = isLastAyah ? parseInt(surah) + 1 : surah;
    const nextAyah = isLastAyah ? 1 : parseInt(ayah) + 1;

    navigate(`/learn/lexicon/${nextSurah}/${nextAyah}`);
  };

  const calculateScore = (vocabCount, selectedVocab, shuffledTranslation) => {
    let correctAnswer = 0;
    let incorrectAnswer = 0;

    const expectedVocabCount = lexiconExamData.filter(
      (vocab) => vocab.isIncluded
    ).length;

    selectedVocab.forEach((vocab) => {
      vocab.isIncluded ? correctAnswer++ : incorrectAnswer++;
    });

    incorrectAnswer += expectedVocabCount - correctAnswer;

    vocabCount == expectedVocabCount ? correctAnswer++ : incorrectAnswer++;

    shuffledTranslation.forEach((vocab) =>
      vocab.id === vocab.area_id ? correctAnswer++ : incorrectAnswer++
    );

    const finalScore = Math.max(
      0,
      (correctAnswer / (correctAnswer + incorrectAnswer)) * 100
    );
    return finalScore.toFixed(2);
  };

  const handleOnSubmit = () => {
    const score = calculateScore(
      vocabCount,
      selectedVocab,
      shuffledTranslation
    );
    if (score === "100.00") {
      alert(
        `Your Score: ${score} / 100 \nCongrats, You can continue to the next ayah`
      );
      handleNavigate(surah, ayah, ayahData.isLastAyah);
    } else {
      alert(`Your Score: ${score} / 100 \nPlease try again!`);
      setIsCheck(true);
    }
  };

  const { surah, ayah } = useParams();
  const [vocabCount, setVocabCount] = useState(0);
  const [selectedVocab, setSelectedVocab] = useState([]);
  const [translationData, setTranslationData] = useState([]);
  const [shuffledTranslation, setShuffledTranslation] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const navigate = useNavigate();

  const {
    isLoading: isLoadAyah,
    isError: isErrorAyah,
    data: ayahData,
  } = useQuery({
    queryFn: () => fetchAyah(surah, ayah),
    queryKey: [`ayah-${surah}/${ayah}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const {
    isLoading: isLoadExam,
    data: lexiconExamData,
    isError: isErrorExam,
  } = useQuery({
    queryFn: () => fetchLexiconExamData(surah, ayah),
    queryKey: [`lexTest-${surah}/${ayah}`],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  useEffect(() => {
    if (translationData?.length === 0) {
      const uniqueData = [
        ...new Map(
          lexiconExamData
            ?.filter((vocab) => vocab.isIncluded)
            .map((filteredVocab) => [
              filteredVocab.arab,
              { ...filteredVocab, area_id: `init-${filteredVocab.id}` },
            ])
        ).values(),
      ];
      setTranslationData(uniqueData);
      setShuffledTranslation([...uniqueData]?.sort(() => Math.random() - 0.5));
    }
  }, [lexiconExamData, translationData?.length]);

  if (isLoadAyah || isLoadExam) return <Loading />;
  if (isErrorAyah || isErrorExam)
    return (
      <Error
        message={"Something went wrong, Please try again"}
        onReload={() => location.reload()}
      />
    );

  return (
    <div className="h-full overflow-y-scroll no-scrollbar pb-4 text-on-secondary">
      <div className="flex flex-col px-4 md:px-16">
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
            <div className="flex gap-2 items-center text-on-secondary/70">
              <p className="font-semibold">Jumlah Kata :</p>
              <input
                type="number"
                min={0}
                max={lexiconExamData?.length}
                value={vocabCount}
                className={`border w-16 p-2 focus:outline-primary ${
                  isCheck &&
                  vocabCount !=
                    lexiconExamData.filter((vocab) => vocab.isIncluded).length
                    ? "border-error"
                    : "border-secondary-variant"
                }`}
                onChange={(e) => {
                  setIsCheck(false);
                  setVocabCount(e.target.value);
                }}
              />
            </div>
            <p className="mt-4 font-semibold text-on-secondary/70">
              Pilih {vocabCount} kata ({selectedVocab.length} dipilih)
            </p>
            <div className="mt-2 flex flex-row-reverse flex-wrap gap-1 font-scheherazade text-xl">
              {lexiconExamData?.map((vocab) => (
                <div
                  key={vocab.id}
                  className={`flex items-center border-2  accent-primary gap-2 rounded-sm p-2 cursor-pointer ${
                    isCheck &&
                    ((vocab.isIncluded &&
                      !selectedVocab.some((v) => v.id === vocab.id)) ||
                      (!vocab.isIncluded &&
                        selectedVocab.some((v) => v.id === vocab.id)))
                      ? "border-error"
                      : "border-secondary"
                  }`}>
                  <label className="cursor-pointer" htmlFor={`${vocab.id}`}>
                    {vocab.arab}
                  </label>
                  <input
                    onChange={() => {
                      handleCheckBoxChange(vocab);
                      setIsCheck(false);
                    }}
                    className="h-4 w-4 cursor-pointer"
                    type="checkbox"
                    id={`${vocab.id}`}
                    disabled={
                      !selectedVocab.includes(vocab) &&
                      vocabCount <= selectedVocab.length
                    }
                  />
                </div>
              ))}
            </div>
            <Divider />
          </div>
          <div className="mt-2">
            <p className="mt-4 font-semibold text-on-secondary/70">
              Pilih terjemahan yang tepat
            </p>
            <DndContext onDragEnd={handleDragEnd}>
              <div className="mt-2 flex flex-row-reverse flex-wrap gap-1  text-xl">
                {translationData?.map((vocab) => (
                  <div key={vocab.id} className="flex flex-col gap-1">
                    <div className="p-1 border-secondary border-2 rounded-xs text-center font-scheherazade">
                      {vocab.arab}
                    </div>
                    <DropArea
                      area_id={vocab.id}
                      items={shuffledTranslation.filter(
                        (translation) => translation.area_id === vocab.id
                      )}
                      propertie={"indonesia"}
                      isCheck={isCheck}
                      isCorrect={
                        shuffledTranslation
                          .filter(
                            (translation) => translation.area_id === vocab.id
                          )
                          .map((v) => v.id === v.area_id)[0]
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 p-2 flex flex-row-reverse flex-wrap gap-1 font-serif text-xl bg-secondary-variant/20">
                {shuffledTranslation?.map((filteredVocab) => (
                  <DropArea
                    key={filteredVocab.id}
                    area_id={`init-${filteredVocab.id}`}
                    items={shuffledTranslation?.filter(
                      (translation) =>
                        translation.area_id === `init-${filteredVocab.id}`
                    )}
                    propertie={"indonesia"}
                    isCheck={isCheck}
                  />
                ))}
              </div>
            </DndContext>
            <Divider />
          </div>

          <div className="mt-2">
            <Label>Terjemah indah : </Label>
            <p className="text-right mt-2 italic text-on-secondary">
              {ayahData?.ayah.teksIndonesia}
            </p>
            <Divider />
          </div>
          <div className="text-right mt-8">
            <Button onClick={handleOnSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LexiconTest;
