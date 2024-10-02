/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface TTextareaProps {
  name: string;
  label?: string;
  variant?: "bordered" | "unstyled";
}

const TTextarea: React.FC<TTextareaProps> = ({
  name,
  label,
  variant = "bordered",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      label={label}
      minRows={4}
      variant={variant}
    />
  );
};

export default TTextarea;
