import type { Project } from '@/features/project/types';
import { Wrapper } from '@/shared/ui/Wrapper';

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <Wrapper>
      <h1 className="text-2xl font-semibold">{project.title}</h1>
      <p className="mt-3 text-sm">{project.description ? project.description : `No description`}</p>
    </Wrapper>
  );
}
