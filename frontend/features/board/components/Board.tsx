import React, { useState } from 'react';
import BoardColumn from '@/features/board/components/BoardColumn';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export interface ColumnProps {
  id: string;
  title: string;
}

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

const COLUMNS: ColumnProps[] = [
  {
    id: 'BACKLOG',
    title: 'Backlog',
  },
  {
    id: 'IN_PROGRESS',
    title: 'In Progress',
  },
  {
    id: 'REVIEW',
    title: 'Review',
  },
  {
    id: 'DONE',
    title: 'Done',
  },
];

const INITIAL_TASKS: TaskProps[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'description task 2',
    status: 'BACKLOG',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'description task 2',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Task 3',
    description: 'description task 3',
    status: 'DONE',
  },
];

const Board = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(INITIAL_TASKS);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskProps['status'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  }

  return (
    <div className="bg-slate-100 p-6">
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${COLUMNS.length}, minmax(0, 1fr))` }}
      >
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default Board;
