import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import UserPage from "./components/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:userId" element={<UserPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
