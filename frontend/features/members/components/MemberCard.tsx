'use client';

import { MemberCardProps } from '@/features/members/types';
import { Button } from '@/shared/ui';
import { Wrapper } from '@/shared/ui/Wrapper';

import { RoleDropdown } from './RoleDropdown';
export function MemberCard({ member, canManage, onChangeRole, onDelete }: MemberCardProps) {
  return (
    <Wrapper>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Name: </span>
              <span>{member.user.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Email: </span>
              <span>{member.user.email}</span>
            </div>
          </div>
        </div>

        <div className="w-35 text-sm text-slate-500">
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
