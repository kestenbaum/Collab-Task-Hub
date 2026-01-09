import React, { useState } from 'react';
import { Button, FormWrapper, Input } from '@/shared/ui';
import { RegisterFormData, registerSchema } from '@/features/auth/schemas/auth.schema';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useStoreAuth } from '@/features/auth/store/use-store-auth';

const RegisterForm = () => {
  const router = useRouter();
  const { registerUser } = useStoreAuth();
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
      await registerUser(data);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? 'Registration failed';
        setApiError(Array.isArray(message) ? message.join(', ') : message);
      } else {
        setApiError('Unexpected error');
      }
    }
  };

  return (
    <FormWrapper className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
    </FormWrapper>
  );
};

export default RegisterForm;
