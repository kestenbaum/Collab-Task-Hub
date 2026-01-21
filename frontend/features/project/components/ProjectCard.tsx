import { ProjectCardProps } from '@/features/project/types';
import { Wrapper } from '@/shared/ui/Wrapper';

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Wrapper>
      <div>
        <h3 className="text-xl font-bold border-b pb-2">{project.title}</h3>
        <p className="mt-4 text-sm">{project.description}</p>
      </div>
    </Wrapper>
  );
}
