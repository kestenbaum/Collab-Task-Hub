import React, { useState } from 'react';

interface ColumnProps {
  id: string;
  title: string;
}

interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
}

const COLUMNS: ColumnProps[] = [
  {
    id: 'TODO',
    title: 'To Do',
  },
  {
    id: 'IN_PROGRESS',
    title: 'In Progress',
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
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'description task 2',
    status: 'IN_PROGRESS',
  },
];

const Board = () => {
  const [tasks, setTasks] = useState<TaskProps[]>(INITIAL_TASKS);
  return (
    <div className="p-4">
      <div className="flex gap-8"></div>
    </div>
  );
};

export default Board;
