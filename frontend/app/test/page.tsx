'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, FormWrapper, Input } from '@/components/ui';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log('Validated Data:', data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-gray-800 text-center">Login</h1>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            placeholder="write email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            placeholder="write password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit">Sign in</Button>
        </FormWrapper>
      </div>
    </div>
  );
}
