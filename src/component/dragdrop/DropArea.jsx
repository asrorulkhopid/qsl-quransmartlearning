import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DragItem from "./DragItem";

const DropArea = ({ area_id, item }) => {
  const { setNodeRef } = useDroppable({ id: area_id });

  return (
    <div
      className="border-1 rounded-sm border-indigo-400 border-dashed min-h-8"
      ref={setNodeRef}>
      {item?.length > 0 ? (
        <DragItem item={item[0]} />
      ) : (
        <p className="m-1 text-slate-400">Drop Here</p>
      )}
    </div>
  );
};

export default DropArea;
