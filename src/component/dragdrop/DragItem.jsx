import { useDraggable } from "@dnd-kit/core";
import React from "react";

const DragItem = ({ item, isCheck }) => {
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
      className={`p-1 border-2 rounded-sm border-indigo-400 cursor-pointer ${
        isCheck && item.id != item.area_id ? "border-red-400" : ""
      }`}>
      {item.indonesia}
    </div>
  );
};

export default DragItem;
