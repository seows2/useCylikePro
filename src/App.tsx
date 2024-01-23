import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
