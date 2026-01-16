'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { ProjectDetails } from '@/features/project/components/ProjectDetails';
import { useProjects } from '@/features/project/hooks/useProject';
import { Tabs } from '@/features/tabs/components';
import { Loader } from '@/shared/ui/Loader';
import { Wrapper } from '@/shared/ui/Wrapper';

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const { selectedProject, isLoading, error, hasLoadedProject, getProjectById } = useProjects();

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId, getProjectById]);

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
      <ProjectDetails project={selectedProject} />

      <Wrapper>
        <Tabs />
      </Wrapper>
    </section>
  );
}
