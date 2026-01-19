'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { ProjectDetails } from '@/features/project/components/ProjectDetails';
import { useProjects } from '@/features/project/hooks/useProject';
import { Tabs } from '@/features/tabs/components';
import { TaskCard } from '@/features/task/components/TaskCard';
import { useTasks } from '@/features/task/hooks/useTask';
import { Button } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { Wrapper } from '@/shared/ui/Wrapper';

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const { selectedProject, isLoading, error, hasLoadedProject, getProjectById } = useProjects();
  const { tasks, getTasks, deleteTask, createTask } = useTasks();

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId, getProjectById]);

  //  Example of working with tasks
  useEffect(() => {
    if (!projectId) return;
    getTasks(projectId);
  }, [projectId, getTasks]);

  const handleOpen = (id: string) => {
    console.log('Open task:', id);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  const handleAddTask = async () => {
    await createTask({
      title: 'Test task',
      description: 'Hardcoded task for testing',
      projectId,
    });
  };
  //

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mt-8">
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (hasLoadedProject && !selectedProject) {
    return (
      <section className="mt-8">
        <div className="container py-6">
          <p className="text-sm text-slate-600">Project not found.</p>
        </div>
      </section>
    );
  }

  if (!selectedProject) {
    return <Loader />;
  }

  return (
    <section className="mt-8 flex flex-col gap-2.5">
      <div className="container">
        <ProjectDetails project={selectedProject} />
      </div>

      {/* Example task */}
      <Button className="w-32" onClick={handleAddTask}>
        Add task
      </Button>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onOpen={handleOpen} onDelete={handleDelete} />
        ))}
      </div>
      {/* .... */}

      <Wrapper>
        <Tabs />
      </Wrapper>
    </section>
  );
}
