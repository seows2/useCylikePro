import { FC } from "react";
import * as S from "./styled";

import { ReactNode } from "react";

export type LabelProps = {
  htmlFor?: string;
  children: ReactNode;
};

export const Label: FC<LabelProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <S.LabelWrapper>
      <S.NomalLabel {...rest}>{children}</S.NomalLabel>
    </S.LabelWrapper>
  );
};
