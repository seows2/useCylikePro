import { ReactNode, useEffect } from "react";
import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  Mode,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import * as S from "./styled";

type FormAPI<T extends FieldValues> = Omit<
  UseFormReturn<T>,
  "trigger" | "handleSubmit"
> & {
  errors: FieldErrors<T>;
};

export type FormProps<T extends FieldValues = FieldValues> = {
  validateOn?: Mode;
  validateOnMount?: boolean;
  validateFieldsOnMount?: string | string[];
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  children: (api: FormAPI<T>) => ReactNode;
  maxWidth?: number | "none";
};

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    validateOn = "onSubmit",
    validateOnMount,
    validateFieldsOnMount,
    children,
    defaultValues,
    onSubmit,
    maxWidth = 600,
  } = props;
  const { handleSubmit, trigger, formState, reset, ...rest } = useForm<T>({
    mode: validateOn,
    defaultValues,
  });

  useEffect(() => {
    if (validateOnMount) {
      // @ts-expect-error
      trigger(validateFieldsOnMount);
    }
  }, [trigger, validateFieldsOnMount, validateOnMount]);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} maxWidth={maxWidth}>
      {children({ errors: formState.errors, formState, reset, ...rest })}
    </S.Form>
  );
};
