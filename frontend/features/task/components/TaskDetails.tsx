import React from 'react';

import { Task } from '@/features/task/types';
import { useFormattedDate } from '@/shared/hooks/useFormattedDate';
import { Button } from '@/shared/ui';

export const TaskDetails = ({ task }: { task: Task }) => {
  const formattedDate = useFormattedDate(task.createdAt);

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold text-slate-900 leading-tight">Title: {task.title}</h2>
        <div className="flex items-center gap-2 mt-2 mb-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
            Task Details
          </span>
        </div>
        <Button variant={'primary'} className="px-3 py-1.5 text-xs">
          Edit
        </Button>
      </div>

      <div className="space-y-4">
        <section>
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
            Task Description
          </h3>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
              {task.description || 'No description provided for this task.'}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-sm">
            <span className="text-slate-400 block">Created at</span>
            <span className="text-slate-600 font-medium">{formattedDate}</span>
          </div>
          <div className="text-sm text-right">
            <span className="text-slate-400 block">ID</span>
            <span className="text-xs text-slate-400 font-mono">#{task.id.slice(0, 8)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
