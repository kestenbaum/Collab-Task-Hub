'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { Button } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { Wrapper } from '@/shared/ui/Wrapper';

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
    return <Loader />;
  }

  const initialName = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <section className="min-h-screen flex flex-col bg-[var(--color-bg-main)] p-6">
      <div className="grid grid-cols-2 gap-6 w-full [&>*]:w-full">
        <div className="flex h-full">
          <Wrapper>
            <span className="border border-[var(--color-border-default)] grid h-20 w-20 place-items-center rounded-full font-medium">
              {initialName}
            </span>
            <ul>
              <li className="mt-1 text-gray-900">
                <span>User ID: {user.id}</span>
              </li>
              <li className="mt-1 text-gray-900">
                <span>User Email: {user.email}</span>
              </li>
              <li className="mt-1 text-gray-900">
                <span>User Name: {user.name}</span>
              </li>
            </ul>
          </Wrapper>
        </div>
        <div className="flex h-full w-1/2">
          <Wrapper>
            User Project: null
            <Button onClick={handleLogout} variant="danger">
              Logout
            </Button>
          </Wrapper>
        </div>
      </div>
    </section>
  );
}
