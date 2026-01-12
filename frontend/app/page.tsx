'use client';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useModal } from '@/features/modal/hooks/useModal';
import { Button } from '@/shared/ui';

export default function Home() {
  const { openModal } = useModal();
  const { isAuth } = useAuth();

  return (
    <section>
      <div className="flex items-center justify-end w-full pt-2.5">
        {isAuth ? (
          <Button
            variant="primary"
            onClick={() =>
              openModal(
                <div className="w-[320px]">
                  <h3>Create Task</h3>
                  <p className="mt-2">Add task form</p>
                </div>,
              )
            }
          >
            Create
          </Button>
        ) : null}
      </div>
    </section>
  );
}
