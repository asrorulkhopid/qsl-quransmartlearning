import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DragItem from "./DragItem";

const MultipleDropArea = ({
  area_id,
  items,
  propertie,
  isCheck,
  isCorrect,
}) => {
  const { setNodeRef } = useDroppable({ id: area_id });

  return (
    <div
      className="w-full h-full flex justify-center flex-wrap gap-2 "
      ref={setNodeRef}>
      {items?.length > 0 &&
        items.map((item, i) => (
          <DragItem
            item={item}
            propertie={propertie}
            isCheck={isCheck}
            isCorrect={isCorrect[i]}
          />
        ))}
      <p className="m-1 text-slate-400 self-center">Drop Here</p>
    </div>
  );
};

export default MultipleDropArea;
