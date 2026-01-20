import React, { FC } from 'react';
import { ColumnProps, TaskProps } from '@/features/board/components/Board';
import BoardCard from '@/features/board/components/BoardCard';
import { useDroppable } from '@dnd-kit/core';

type ColumnType = {
  column: ColumnProps;
  tasks: TaskProps[];
};

const BoardColumn: FC<ColumnType> = ({ column, tasks }) => {
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
