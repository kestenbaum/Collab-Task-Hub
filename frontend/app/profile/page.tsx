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
    <section className="min-h-[calc(100vh-77px-4rem)] bg-bg-main p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Wrapper className="flex flex-col items-center p-10 text-center md:items-start md:text-left h-full">
          <div className="mb-6">
            <span className="border-2 border-border-default flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold bg-white text-(--color-text-main) shadow-sm">
              {initialName}
            </span>
          </div>

          <div className="space-y-4 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">User Profile</h2>
            <div className="space-y-2">
              <p className="flex justify-between md:block">
                <span className="text-sm font-medium text-gray-500 block uppercase tracking-wider">
                  Name
                </span>
                <span className="text-lg text-gray-800">{user.name}</span>
              </p>
              <p className="flex justify-between md:block border-t md:border-none pt-2 md:pt-0">
                <span className="text-sm font-medium text-gray-500 block uppercase tracking-wider">
                  Email
                </span>
                <span className="text-lg text-gray-800">{user.email}</span>
              </p>
            </div>
          </div>
        </Wrapper>

        <Wrapper className="flex flex-col h-full p-10 justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-2">
              Current Activity
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 border border-dashed border-gray-300">
              <p className="text-gray-500 italic">
                User Project: <span className="font-medium text-gray-700 not-italic">null</span>
              </p>
            </div>
          </div>

          <div className="mt-auto pt-6">
            <Button
              onClick={handleLogout}
              variant="danger"
              className="w-full py-3 text-lg font-medium transition-transform active:scale-[0.98]"
            >
              Logout from Account
            </Button>
          </div>
        </Wrapper>
      </div>
    </section>
  );
}
