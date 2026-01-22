import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { LoginFormData, loginSchema } from '@/features/auth/schemas/auth.schema';
import { Button, FormWrapper, Input } from '@/shared/ui';

const LoginForm = () => {
  const router = useRouter();
  const { loginUser, authError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data);
      router.push('/');
    } catch (error: unknown) {
      throw error;
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {authError && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{authError}</h3>
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
