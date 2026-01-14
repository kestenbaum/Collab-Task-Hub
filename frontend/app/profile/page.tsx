'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { updateProfileSchema, UpdateProfileFormData } from '@/features/user/schemas/user.schema';
import { Button, Input } from '@/shared/ui';
import { Loader } from '@/shared/ui/Loader';
import { Wrapper } from '@/shared/ui/Wrapper';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logoutUser, updateUser, isLoading } = useStoreAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    },
  });

  const handleLogout = () => {
    logoutUser();
    router.push('/login');
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      // Cancel edit - reset form to current user values
      reset({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
      });
      setUpdateError(null);
      setUpdateSuccess(false);
    }
    setIsEditMode(!isEditMode);
  };

  const onSubmit = async (data: UpdateProfileFormData) => {
    setUpdateError(null);
    setUpdateSuccess(false);

    try {
      // Only send non-empty fields
      const updateData: any = {};
      if (data.name && data.name !== user?.name) updateData.name = data.name;
      if (data.email && data.email !== user?.email) updateData.email = data.email;
      if (data.password) updateData.password = data.password;

      // If no changes, exit edit mode
      if (Object.keys(updateData).length === 0) {
        setIsEditMode(false);
        return;
      }

      await updateUser(updateData);

      // Reset password field after successful update
      reset({
        name: data.name,
        email: data.email,
        password: '',
      });

      setUpdateSuccess(true);
      setIsEditMode(false);

      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error: any) {
      setUpdateError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!user) {
    return <Loader />;
  }

  const initialName = user?.name ? user.name.trim().charAt(0).toUpperCase() : 'U';

  return (
    <section className="min-h-[calc(100vh-77px-4rem)] bg-bg-main pt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Wrapper className="flex flex-col items-center p-10 text-center md:items-start md:text-left h-full">
          <div className="mb-6">
            <span className="border-2 border-border-default flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold bg-white text-(--color-text-main) shadow-sm">
              {initialName}
            </span>
          </div>

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

            {updateSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                Profile updated successfully!
              </div>
            )}

            {updateError && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {updateError}
              </div>
            )}

            {isEditMode ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Name"
                  type="text"
                  {...register('name')}
                  error={errors.name?.message}
                  placeholder="Enter your name"
                />

                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  placeholder="Enter your email"
                />

                <Input
                  label="Password"
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                  placeholder="Leave empty to keep current password"
                  helperText="Leave empty to keep your current password"
                />

                <div className="flex gap-3 pt-2">
                  <Button type="submit" variant="primary" className="flex-1" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            ) : (
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
            )}
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
