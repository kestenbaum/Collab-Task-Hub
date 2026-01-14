'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useModal } from '@/features/modal/hooks/useModal';
import { useProjects } from '@/features/project/hooks/useProject';
import { CreateFormData, createFormSchema } from '@/features/project/schemas/project.schema';
import { Button, FormWrapper, Input } from '@/shared/ui';

const CreateForm = () => {
  const { createProject, isLoading } = useProjects();
  const { closeModal } = useModal();

  const { register, handleSubmit, reset } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = async (data: CreateFormData) => {
    try {
      await createProject({
        title: data.title,
        description: data.description,
      });
      reset();
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full max-w-[450px]">
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-2.5">
          <Input type="text" placeholder="Write title..." {...register('title')} />
          <Input type="text" placeholder="Write title..." {...register('description')} />
          <Button type="submit">{isLoading ? 'Creating…' : 'Create project'}</Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default CreateForm;
