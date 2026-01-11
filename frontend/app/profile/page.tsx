'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { Button } from '@/shared/ui';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuth, logoutUser } = useStoreAuth();

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>

        <div className="space-y-4">
          <div className="border-b pb-3">
            <label className="block text-sm font-medium text-gray-600">ID</label>
            <p className="mt-1 text-gray-900">{user.id}</p>
          </div>

          <div className="border-b pb-3">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>

          <div className="border-b pb-3">
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <p className="mt-1 text-gray-900">{user.name}</p>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleLogout} variant="danger" className="w-full">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
