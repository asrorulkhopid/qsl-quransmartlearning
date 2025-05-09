import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchMorphologiExam } from "../../../api/endpoint";
import { useNavigate, useParams } from "react-router-dom";
import DropArea from "../../../component/dragdrop/DropArea";
import { DndContext } from "@dnd-kit/core";
import MultipleDropArea from "../../../component/dragdrop/MultipleDropArea";
import Divider from "../../../component/element/Divider";
import Button from "../../../component/element/Button";
import MainTitle from "../../../component/element/MainTitle";
import Loading from "../../loading/Loading";
import Error from "../../error/Error";
import Label from "../../../component/element/Label";

const MorphologiTest = () => {
  const handleDragEnd = (event) => {
    const { over, active } = event;

    setIsCheck(false);

    if (!over) return;

    const itemId = active.id;
    let newAreaId = over.id;

    const targetItems = vocabularies.filter(
      (item) => item.area_id === newAreaId
    );

    const isLimitedArea = typeof newAreaId === "number";

    if (isLimitedArea) {
      if (targetItems.length >= 1) return;
      else newAreaId = itemId;
    }

    setVocabularies((prev) =>
      prev.map((item) =>
        item.id == itemId ? { ...item, area_id: newAreaId } : item
      )
    );
  };

  const calculateScore = (vocabularies, morph) => {
    const correctAnswer = vocabularies.filter(
      (vocab) =>
        String(vocab.area_id).toLowerCase() === String(vocab[morph]) ||
        (vocab.area_id === "other" && null === vocab[morph])
    ).length;

    const score = (correctAnswer * 100) / vocabularies.length;

    return score.toFixed(2);
  };

  const handleOnSubmit = () => {
    const finalScore = calculateScore(vocabularies, data.morph.morph_list[0]);
    if (finalScore == "100.00") {
      alert(
        `Your Score : ${finalScore} \n Congrats, you can contnue to the next lesson`
      );
      if (id < 3) navigate(`/learn/morphologi/${parseInt(id) + 1}`);
    } else {
      alert(`Your Score : ${finalScore} \n Please try again`);
      setIsCheck(true);
    }
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [vocabularies, setVocabularies] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  const { isLoading, isError, data, refetch } = useQuery({
    queryFn: fetchMorphologiExam,
    queryKey: ["morph-exam", id],
    staleTime: Infinity,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error onReload={refetch} />;

  if (vocabularies.length === 0) {
    setVocabularies(
      data.dictionaries.map((dict, i) => ({ ...dict, id: i, area_id: i }))
    );
  }

  return (
    <div className="h-full overflow-y-scroll no-scrollbar text-on-secondary">
      <div className="flex flex-col p-4 md:px-16">
        <div className="self-center">
          <MainTitle>{data.morph.title}</MainTitle>
        </div>
        <div className="w-full mt-4">
          <p style={{ direction: "rtl" }} className="text-xl font-scheherazade">
            {data.ayah.teksArab}
          </p>
          <Divider />
        </div>
        <Label>Kelompokkan mufradat berikut: </Label>
        <DndContext onDragEnd={handleDragEnd}>
          <div className="mt-2 w-full flex flex-row-reverse flex-wrap gap-2">
            {data.dictionaries.map((_, i) => (
              <DropArea
                key={i}
                area_id={i}
                items={vocabularies.filter((v) => v.area_id === i)}
                propertie={"arab"}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col w-full gap-2 items ">
            {data.morph.classification.map((className) => (
              <div
                key={className}
                className="p-2 border-secondary border-2 flex flex-col items-center w-full">
                <div>{className}</div>
                <MultipleDropArea
                  area_id={className}
                  items={vocabularies.filter((v) => v.area_id === className)}
                  propertie={"arab"}
                  isCheck={isCheck}
                  isCorrect={vocabularies
                    .filter((v) => v.area_id === className)
                    .map(
                      (v) =>
                        String(v.area_id).toLowerCase() ===
                        String(v[data.morph.morph_list[0]]).toLowerCase()
                    )}
                />
              </div>
            ))}
            <div className="p-2 border-secondary border-2 flex flex-col items-center w-full">
              <div>Lainnya</div>
              <MultipleDropArea
                area_id={"other"}
                items={vocabularies.filter((v) => v.area_id === "other")}
                propertie={"arab"}
                isCheck={isCheck}
                isCorrect={vocabularies
                  .filter((v) => v.area_id === "other")
                  .map((v) => null === v[data.morph.morph_list[0]])}
              />
            </div>
          </div>
        </DndContext>

        <div className="text-right m-8 w-full">
          <Button onClick={handleOnSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default MorphologiTest;
