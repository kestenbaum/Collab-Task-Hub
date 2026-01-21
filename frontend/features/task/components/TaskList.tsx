'use client';

import React, { useCallback, useEffect } from 'react';

import ConfirmDeleteModal from '@/features/modal/components/ConfirmDeleteModal';
import { useModal } from '@/features/modal/hooks/useModal';
import { useProjects } from '@/features/project/hooks/useProject';
import CreateTaskForm from '@/features/task/components/CreateTaskForm';
import { TaskCard } from '@/features/task/components/TaskCard';
import { TaskDetails } from '@/features/task/components/TaskDetails';
import { useTasks } from '@/features/task/hooks/useTask';
import { Button } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';

const TaskList = () => {
  const { selectedProject } = useProjects();
  const projectId = selectedProject?.id;

  const { tasks, getTasks, deleteTask, isLoading, error } = useTasks();
  const { openModal } = useModal();

  useEffect(() => {
    if (!projectId) return;
    void getTasks(projectId);
  }, [projectId, getTasks]);

  const handleCreateTask = useCallback(() => {
    openModal(<CreateTaskForm />);
  }, [openModal]);

  const handleDeleteTask = (taskId: string) => {
    openModal(<ConfirmDeleteModal entityName="task" onConfirm={() => deleteTask(taskId)} />);
  };

  const handleOpenTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      openModal(<TaskDetails task={task} />);
    },
    [openModal, tasks],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-4">
        <Button type="button" onClick={handleCreateTask}>
          Add task
        </Button>
      </div>

      {isLoading && <Loader />}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isLoading && !error && tasks.length === 0 && (
        <p className="text-sm text-slate-500">No tasks yet.</p>
      )}

      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={handleOpenTask} onDelete={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
