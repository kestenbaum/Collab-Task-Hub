import React from 'react';
import { Button, FormWrapper, Input } from '@/shared/ui';
import { useForm } from 'react-hook-form';
import { CreateFormData, createFormSchema } from '@/features/project/schemas/project.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const CreateForm = () => {
  const { register, handleSubmit } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = (data: CreateFormData) => {
    console.log('Data:', data);
  };

  return (
    <div className="w-full max-w-[450px]">
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-2.5">
          <Input type="text" placeholder="Write title..." {...register('title')} />
          <Input type="text" placeholder="Write title..." {...register('description')} />
          <Button>Add new Task</Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default CreateForm;
