import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DragItem from "./DragItem";

const DropArea = ({ area_id, items, propertie, isCheck, isCorrect }) => {
  const { setNodeRef } = useDroppable({ id: area_id });

  return (
    <div
      className={`border-1 rounded-sm border-dashed min-h-8 ${
        items?.length === 1 && isCheck && items[0]?.id != area_id
          ? "border-error"
          : "border-secondary"
      }`}
      ref={setNodeRef}>
      {items?.length > 0 ? (
        items.map((item) => (
          <DragItem
            key={item.id}
            item={item}
            propertie={propertie}
            isCheck={isCheck}
            isCorrect={isCorrect}
          />
        ))
      ) : (
        <p className="m-1 text-secondary-variant/20">Drop Here</p>
      )}
    </div>
  );
};

export default DropArea;
