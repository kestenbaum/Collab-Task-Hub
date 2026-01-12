'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';

const AppHeader = () => {
  const { isAuth, user, logoutUser } = useAuth();
  const [open, setOpen] = useState(false);

  const initialName = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  const guestActions = (
    <div>
      <Link
        href="/login"
        className="text-xl relative inline-block
               after:absolute after:left-0 after:-bottom-1
               after:h-[2px] after:w-full after:bg-current
               after:scale-x-0 after:origin-left
               after:transition-transform after:duration-300
               hover:after:scale-x-100 mr-8"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="text-xl relative inline-block
               after:absolute after:left-0 after:-bottom-1
               after:h-[2px] after:w-full after:bg-current
               after:scale-x-0 after:origin-left
               after:transition-transform after:duration-300
               hover:after:scale-x-100"
      >
        Register
      </Link>
    </div>
  );

  const userActions = (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 cursor-pointer"
      >
        <span className="border-default grid h-9 w-9 place-items-center rounded-full">
          {initialName}
        </span>
        <span className="text-xs text-slate-500">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-md border border-slate-200 bg-white p-1 shadow-sm">
          <Link
            href="/profile"
            className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <button
            type="button"
            className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 cursor-pointer"
            onClick={() => {
              setOpen(false);
              logoutUser();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Collab Task Hub"
            width={50}
            height={45}
            priority
            className="shrink-0"
          />
          <span className="font-heading font-medium text-2xl">CollabTask</span>
        </Link>
        {!isAuth ? guestActions : userActions}
      </div>
    </header>
  );
};

export default AppHeader;
