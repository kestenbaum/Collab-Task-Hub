'use client';

import { useEffect } from 'react';

import { useMembers } from '@/features/members/hooks/useMember';
import { AddMemberProps } from '@/features/members/types';
import { ProjectRole } from '@/features/project/types';
import { useUsers } from '@/features/user/hooks/useUsers';
import { Button } from '@/shared/ui/Button';
import { Loader } from '@/shared/ui/Loader';
import { Wrapper } from '@/shared/ui/Wrapper';

export function AddMember({ projectId, onClose, members }: AddMemberProps) {
  const { users, isLoading: usersLoading, error: usersError, getUsers } = useUsers();
  const { addMember, isLoading: memberLoading, error: memberError } = useMembers();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const memberUserId = new Set(members.map((m) => m.userId));
  const availableUsers = users.filter((u) => !memberUserId.has(u.id));

  const handleAdd = async (userId: string) => {
    await addMember(projectId, { userId, role: ProjectRole.MEMBER });
    onClose();
  };

  if (usersLoading) return <Loader />;

  return (
    <div className="w-full">
      <h3>Add new users to this project</h3>
      {usersError && <p className="mt-2 text-sm text-red-500">{usersError}</p>}

      <div className="mt-4 flex flex-col gap-2">
        {availableUsers.length === 0 ? (
          <p>All users are already members of this project.</p>
        ) : (
          availableUsers.map((u) => (
            <Wrapper key={u.id}>
              <div className="flex items-center justify-between">
                <p className="truncate text-sm font-medium">{u.name}</p>

                <Button
                  variant="secondary"
                  className="px-3 py-1.5 text-xs"
                  onClick={() => handleAdd(u.id)}
                  disabled={memberLoading}
                >
                  Add to project
                </Button>
              </div>
            </Wrapper>
          ))
        )}
      </div>
      {memberError && <p className="mt-3 text-sm text-red-500">{memberError}</p>}
    </div>
  );
}
