import { useDraggable } from "@dnd-kit/core";
import React from "react";

const DragItem = ({ item }) => {
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
      style={style}
      className="p-1 border-2 border-indigo-400 cursor-pointer">
      {item.indonesia}
    </div>
  );
};

export default DragItem;
