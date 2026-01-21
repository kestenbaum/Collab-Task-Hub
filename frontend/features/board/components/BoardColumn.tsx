import React, { FC } from 'react';
import { useDroppable } from '@dnd-kit/core';

import BoardCard from '@/features/board/components/BoardCard';
import { ColumnType } from '@/features/board/types';

const BoardColumn: FC<ColumnType> = ({ tasks, column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div ref={setNodeRef} className="flex min-h-50 flex-col rounded-xl bg-slate-50 p-4 shadow">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
        {column.title}
      </h2>

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <BoardCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
