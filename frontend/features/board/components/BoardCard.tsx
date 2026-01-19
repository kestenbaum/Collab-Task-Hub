import React, { FC } from 'react';
import { Wrapper } from '@/shared/ui/Wrapper';
import { TaskProps } from '@/features/board/components/Board';

type BoardCardProps = {
  task: TaskProps;
};

const BoardCard: FC<BoardCardProps> = ({ task }) => {
  return (
    <Wrapper>
      <h2 className="text-sm font-medium text-slate-900">{task.title}</h2>

      <p className="mt-1 text-xs text-slate-500">{task.description}</p>
    </Wrapper>
  );
};

export default BoardCard;
