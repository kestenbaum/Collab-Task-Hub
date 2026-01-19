'use client';

import type { TaskCardProps } from '@/features/task/types';
import { Wrapper } from '@/shared/ui/Wrapper';

export function TaskCard({ task, onOpen, onDelete }: TaskCardProps) {
  return (
    <Wrapper>
      <div className="flex items-center justify-between gap-3">
        <p>{task.title}</p>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
            onClick={() => onOpen(task.id)}
          >
            Open
          </button>

          <button
            type="button"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
