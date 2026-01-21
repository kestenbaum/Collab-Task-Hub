'use client';

import type { TaskCardProps } from '@/features/task/types';
import { Button } from '@/shared/ui';
import { Wrapper } from '@/shared/ui/Wrapper';

export function TaskCard({ task, onOpen, onDelete }: TaskCardProps) {
  return (
    <Wrapper>
      <div className="flex items-center justify-between gap-3">
        <p>{task.title}</p>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            className="px-3 py-1.5 text-xs"
            onClick={() => onOpen(task.id)}
          >
            Open
          </Button>

          <Button className="px-3 py-1.5 text-xs" variant={'primary'}>
            Edit
          </Button>

          <Button
            type="button"
            variant="danger"
            className="px-3 py-1.5 text-xs"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
