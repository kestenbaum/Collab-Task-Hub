import { ProjectCardProps } from '@/features/project/types';
import { Button } from '@/shared/ui';
import { Wrapper } from '@/shared/ui/Wrapper';

export function ProjectCard({ project, isAuth, onJoin }: ProjectCardProps) {
  return (
    <Wrapper>
      <div>
        <h3 className="text-xl font-bold border-b pb-2">{project.title}</h3>
        <p className="mt-4 text-sm">{project.description}</p>
      </div>

      {isAuth && (
        <div className="flex justify-end">
          <Button
            className="mt-4"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onJoin?.(project.id);
            }}
          >
            Join
          </Button>
        </div>
      )}
    </Wrapper>
  );
}
