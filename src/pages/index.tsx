import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectors } from "../lib/e2e-selector";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 data-testid={selectors.pages.Main.title}>메인 페이지</h1>
      <Button
        data-testid={selectors.pages.Main.registerBtn}
        variant="contained"
        onClick={() => navigate("/register")}
      >
        회원가입
      </Button>
    </>
  );
};

export default MainPage;
