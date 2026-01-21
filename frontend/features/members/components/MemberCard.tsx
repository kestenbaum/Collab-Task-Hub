'use client';

import { MemberCardProps } from '@/features/members/types/index';
import { Button } from '@/shared/ui';
import { Wrapper } from '@/shared/ui/Wrapper';

import { RoleDropdown } from './RoleDropdown';
export function MemberCard({ member, canManage, onChangeRole, onDelete }: MemberCardProps) {
  return (
    <Wrapper>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p>{member.user.name}</p>
        </div>

        <div className="w-[140px] text-sm text-slate-500">
          Role: <span>{member.role}</span>
        </div>

        {canManage ? (
          <div className="flex items-center gap-2">
            <RoleDropdown value={member.role} onChange={onChangeRole} />

            <Button
              type="button"
              variant="danger"
              className="px-3 py-1.5 text-xs"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
}
