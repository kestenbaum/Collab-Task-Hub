'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { ProjectDetails } from '@/features/project/components/ProjectDetails';
import { useProjects } from '@/features/project/hooks/useProject';
import { Loader } from '@/shared/ui/Loader';

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const { selectedProject, isLoading, error, getProjectById } = useProjects();

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId, getProjectById]);

  const errorMessage = error ? (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <p className="text-sm text-red-700">{error}</p>
    </div>
  ) : null;

  const showNotFound = !isLoading && !error && !selectedProject;

  if (showNotFound) {
    return (
      <section className="mt-8">
        <div className="container py-6">
          <p className="text-sm text-slate-600">Project not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="container">
        {isLoading ? <Loader /> : null}
        {errorMessage}
        {selectedProject ? <ProjectDetails project={selectedProject} /> : null}
      </div>
    </section>
  );
}
