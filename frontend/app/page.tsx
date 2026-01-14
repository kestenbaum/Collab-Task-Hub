'use client';
import { useEffect } from 'react';
import Link from 'next/link';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useModal } from '@/features/modal/hooks/useModal';
import { CreateForm } from '@/features/project/components';
import { ProjectCard } from '@/features/project/components/ProjectCard';
import { useProjects } from '@/features/project/hooks/useProject';
import { mockProjects } from '@/features/project/mocks/projects.mock';
import { Button } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';

export default function Home() {
  const { openModal } = useModal();
  const { isAuth } = useAuth();

  const handleJoin = (projectId: string) => {
    console.log('Join project:', projectId);
  };

  const { projects, error, getProjects } = useProjects();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  if (error)
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <button className="underline" onClick={getProjects}>
          Retry
        </button>
      </div>
    );
  return (
    <section className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl">Projects</h1>

        {isAuth ? (
          <Button
            variant="primary"
            onClick={() =>
              openModal(
                <div className="w-[320px]">
                  <h3 className="mb-2.5">Create Task</h3>
                  <p className="mt-2">Add task form</p>
                  <CreateForm />
                </div>,
              )
            }
          >
            Create
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`} className="block">
            <ProjectCard project={project} isAuth={isAuth} onJoin={handleJoin} />
          </Link>
        ))}
      </div>
    </section>
    // <section>
    //   <div className="flex items-center justify-end w-full pt-2.5">
    //     {isAuth ? (
    //       <Button
    //         variant="primary"
    //         onClick={() =>
    //           openModal(
    //             <div className="w-[320px]">
    //               <h3 className="mb-2.5">Create Task</h3>
    //               <p className="mt-2">Add task form</p>
    //               <CreateForm />
    //             </div>,
    //           )
    //         }
    //       >
    //         Create
    //       </Button>
    //     ) : null}
    //   </div>
    // </section>
  );
}
