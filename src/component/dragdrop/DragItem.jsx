import { useDraggable } from "@dnd-kit/core";
import React from "react";

const DragItem = ({ item, propertie, isCheck, isCorrect }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, touchAction: "none" }}
      className={`p-1 min-w-12 border-2 rounded-sm border-indigo-400 cursor-pointer font-scheherazade text-center ${
        isCheck && !isCorrect ? "border-red-400" : ""
      }`}>
      {item[propertie]}
    </div>
  );
};

export default DragItem;
