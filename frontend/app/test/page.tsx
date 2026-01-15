'use client';

import { useModal } from '@/features/modal/hooks/useModal';
import Tabs from '@/features/tabs/components/Tabs';
import { Loader } from '@/shared/ui/Loader';
import { Wrapper } from '@/shared/ui/Wrapper';

export default function Page() {
  const { openModal } = useModal();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 text-center">Login</h1>
        <div className="container bg-bg-main">
          <div className="bg-bg-white p-6 rounded-lg shadow-sm">
            <h1>Header h1</h1>
            <Loader />
            <Tabs />
            <p className="text-txt-main mt-2">text text text</p>
            <p className="text-txt-warning mt-2">warning</p>
            <p className="text-txt-success mt-2">success</p>
            <button className="btn btn-primary">Save</button>
            <button className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary" disabled>
              Disabled
            </button>
            <div className="p-10 space-y-4">
              <h2>Header h2</h2>
              <p>text text text</p>
              <div className="bg-bg-white p-4 rounded shadow">
                <h3>Header h3</h3>
                <p>text text text</p>
              </div>
            </div>
            <div className="border-default p-4">Content</div>
            <input className="input" placeholder="Hallo" />
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={() =>
            openModal(
              <div className="w-[320px]">
                <h3>Test modal</h3>
                <p className="mt-2">Content ...........</p>
              </div>,
            )
          }
        >
          Popup
        </button>

        {/* Wrapper example */}
        <div className="mt-4">
          <Wrapper>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </Wrapper>
        </div>
      </div>
    </div>
  );
}
