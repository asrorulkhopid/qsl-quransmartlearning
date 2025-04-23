import { useDroppable } from "@dnd-kit/core";
import React from "react";
import DragItem from "./DragItem";

const DropArea = ({ area_id, item, isCheck }) => {
  const { setNodeRef } = useDroppable({ id: area_id });

  return (
    <div
      className={`border-1 rounded-sm border-indigo-400 border-dashed min-h-8 ${
        item?.length === 1 && isCheck && item[0]?.id != area_id
          ? "border-red-500"
          : ""
      }`}
      ref={setNodeRef}>
      {item?.length > 0 ? (
        <DragItem item={item[0]} isCheck={isCheck} />
      ) : (
        <p className="m-1 text-slate-400">Drop Here</p>
      )}
    </div>
  );
};

export default DropArea;
