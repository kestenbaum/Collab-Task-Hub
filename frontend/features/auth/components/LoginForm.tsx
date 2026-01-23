import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { LoginFormData, loginSchema } from '@/features/auth/schemas/auth.schema';
import { Button, FormWrapper, Input } from '@/shared/ui';

const LoginForm = () => {
  const router = useRouter();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearErrors('root');

    try {
      await loginUser(data);
      router.push('/');
    } catch (error: unknown) {
      setError('root', {
        type: 'server',
        message: error instanceof Error ? error.message : 'Invalid email or password',
      });
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {errors.root && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {errors.root.message}
          </div>
        )}

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          placeholder="Enter your email address"
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          placeholder="Enter your password"
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
