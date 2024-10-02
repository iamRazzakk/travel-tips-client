"use client";

import { ReactNode } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

interface CustomFormProps extends UseFormProps<any> {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const CustomForm: React.FC<CustomFormProps> = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}) => {
  const methods = useForm({
    defaultValues,
    resolver,
  });

  return (
    <FormProvider {...methods}>
      <form className="space-y-2" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default CustomForm;
