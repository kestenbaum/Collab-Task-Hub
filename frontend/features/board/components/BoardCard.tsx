import React, { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { BoardCardProps } from '@/features/board/types';

const BoardCard: FC<BoardCardProps> = ({ task }) => {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      className="cursor-grab p-4 border border-gray-200 bg-white"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <h2 className="text-sm font-medium text-slate-900">{task.title}</h2>
      <p className="mt-1 text-xs text-slate-500">{task.description}</p>
    </div>
  );
};

export default BoardCard;
