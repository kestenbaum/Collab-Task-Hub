'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { registerSchema, RegisterFormData } from '@/features/auth/schemas/auth.schema';
import { authServices } from '@/features/auth/api/services/authServices';
import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import Link from 'next/link';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useStoreAuth();
  const [apiError, setApiError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError('');
      const response = await authServices.register(data);
      setAuth(response.access_token, response.user);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Registration failed. Please try again.';
        setApiError(Array.isArray(message) ? message.join(', ') : message);
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {apiError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{apiError}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Full name"
              type="text"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              helperText="Must be at least 6 characters"
              {...register('password')}
            />
          </div>

          <div>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
