import { ProjectCardProps } from '@/features/project/types';
import { Wrapper } from '@/shared/ui/Wrapper';

export function ProjectCard({ project, isAuth, onJoin }: ProjectCardProps) {
  return (
    <Wrapper>
      <div>
        <h3 className="text-xl font-bold">{project.title}</h3>
        <p className="mt-2 text-sm">{project.description}</p>
      </div>

      {isAuth && (
        <button
          className="btn btn-secondary mt-6 self-end"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onJoin?.(project.id);
          }}
        >
          Join
        </button>
      )}
    </Wrapper>
  );
}
