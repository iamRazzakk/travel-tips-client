/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface TInputProps {
  name: string;
  className?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  label?: string;
  variant?: "bordered" | "unstyled";
  size?: "sm" | "md" | "lg";
  required?: boolean;
}

const TInput: React.FC<TInputProps> = ({
  name,
  label,
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      type={type}
      variant={variant}
      {...props}
    />
  );
};

export default TInput;
