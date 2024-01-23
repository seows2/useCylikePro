import {
  Children,
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
} from "react";
import { FormHelperText } from "@mui/material";
import { Label } from "../Label";
import * as S from "./styled";

type FieldProps = {
  children: ReactElement;
  label?: ReactNode;
  error?: boolean;
  errorMsg?: string;
  htmlFor?: string;
};

export const Field = forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  const { label, errorMsg, htmlFor } = props;
  const { children, error } = props;
  const inputId = htmlFor ?? getChildId(children);

  const labelElement =
    typeof label === "string" ? (
      <Label htmlFor={inputId}>{label}</Label>
    ) : (
      label
    );

  return (
    <S.FieldWrap>
      {labelElement}
      <div>
        <div ref={ref}>{cloneElement(children, { error })}</div>
        {error && errorMsg && (
          <S.FieldValidationWrap>
            <FormHelperText error>{errorMsg}</FormHelperText>
          </S.FieldValidationWrap>
        )}
      </div>
    </S.FieldWrap>
  );
});

const getChildId = (children: ReactElement): string | undefined => {
  let childId: unknown;

  const child = Children.only(children);

  if ("id" in child.props) {
    childId = child.props.id;
  }

  return typeof childId === "string" ? childId : undefined;
};
