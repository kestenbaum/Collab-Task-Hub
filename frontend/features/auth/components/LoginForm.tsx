import React, { useState } from 'react';
import { Button, FormWrapper, Input } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '@/features/auth/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [apiError, setApiError] = useState<string>('');
  const router = useRouter();
  const { loginUser } = useStoreAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError('');
      await loginUser(data);
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? 'Login failed';
        setApiError(Array.isArray(message) ? message.join(', ') : message);
      } else {
        setApiError('Unexpected error');
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
          label="Email address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          placeholder="Write your email address"
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          placeholder="Write your password"
          {...register('password')}
        />
      </div>

      <div>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} variant="primary">
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </FormWrapper>
  );
};

export default LoginForm;
