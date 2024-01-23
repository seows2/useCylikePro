import { Button, Input } from "@mui/material";
import { Field } from "../../components/Field";
import { Form } from "../../components/Form";
import { useState } from "react";

type LoginDTO = {
  userId: string;
  password: string;
};

const LoginPage = () => {
  const [data, setData] = useState<LoginDTO>();

  const handleSubmit = (data: LoginDTO) => {
    setData(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} validateOn="all">
        {({ register, errors }) => (
          <>
            <Field
              label="아이디"
              error={!!errors.userId}
              errorMsg={errors.userId?.message}
            >
              <Input
                {...register("userId", {
                  required: "아이디를 입력해주세요",
                })}
              />
            </Field>
            <Field
              label="비밀번호"
              error={!!errors.password}
              errorMsg={errors.password?.message}
            >
              <Input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
              />
            </Field>
            <Button variant="contained" type="submit">
              로그인 하기
            </Button>
          </>
        )}
      </Form>
    </>
  );
};

export default LoginPage;
