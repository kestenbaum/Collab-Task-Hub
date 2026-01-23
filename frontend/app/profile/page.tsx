'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import ProfileName from '@/features/project/components/ProfileName';
import ProfileProjects from '@/features/project/components/ProfileProjects';
import { UserInfo } from '@/features/user/components/UserInfo';
import { UpdateProfileFormData, updateProfileSchema } from '@/features/user/schemas/user.schema';
import { UpdateUserDto } from '@/features/user/types';
import { Button, Input, Loader } from '@/shared/ui';
import { Wrapper } from '@/shared/ui/Wrapper';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logoutUser, updateUser, isLoading, refreshUser } = useStoreAuth();
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name,
      email: user.email,
      password: '',
    });
  }, [user, reset]);

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const handleEditToggle = () => {
    if (isEditMode && user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
    setIsEditMode((prev) => !prev);
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    if (!user) return;
    clearErrors('root');

    try {
      const updateData: UpdateUserDto = {};

      if (data.name !== user.name) updateData.name = data.name;
      if (data.email !== user.email) updateData.email = data.email;
      if (data.password) updateData.password = data.password;

      if (Object.keys(updateData).length === 0) {
        setIsEditMode(false);
        return;
      }

      await updateUser(updateData);

      if (updateData.password) {
        logoutUser();
        router.push('/login');
        return;
      }

      reset({
        name: data.name,
        email: data.email,
        password: '',
      });

      setIsEditMode(false);
    } catch (error: unknown) {
      setError('root', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Update failed',
      });
    }
  };

  if (!user) return <Loader />;

  return (
    <section className="min-h-[calc(100vh-77px-4rem)] bg-bg-main pt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Wrapper className="flex flex-col items-center p-10 text-center md:items-start md:text-left h-full">
          <ProfileName />

          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-2xl font-semibold text-gray-900">User Profile</h2>
              <Button
                onClick={handleEditToggle}
                variant={isEditMode ? 'secondary' : 'primary'}
                className="px-4 py-2 text-sm"
              >
                {isEditMode ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {errors.root.message}
              </div>
            )}

            {isEditMode ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  {...register('name')}
                  error={errors.name?.message}
                />

                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <Input
                  label="Password"
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                  helperText="Leave empty to keep your current password"
                />

                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            ) : (
              <UserInfo name={user.name} email={user.email} />
            )}
          </div>
        </Wrapper>

        <ProfileProjects user={user} handleLogout={handleLogout} />
      </div>
    </section>
  );
}
