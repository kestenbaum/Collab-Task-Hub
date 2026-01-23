import React from 'react';

import { User } from '@/features/user/types';

export const UserInfo = (user: User) => {
  return (
    <div className="space-y-2">
      <p>
        <span className="text-sm text-gray-500">Name</span>
        <br />
        <span className="text-lg">{user.name}</span>
      </p>
      <p>
        <span className="text-sm text-gray-500">Email</span>
        <br />
        <span className="text-lg">{user.email}</span>
      </p>
    </div>
  );
};
