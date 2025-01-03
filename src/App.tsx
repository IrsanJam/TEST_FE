import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/old/Homepage";
import DetailPage from "./pages/old/DetailPage";
import ProtectedRoute from "./pages/protected/ProtectedRoute";
import LoginPage from "./pages/old/LoginPage";
// import Home from "./pages/Real/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/main" element={<Homepage />}></Route>
          <Route path="/detail/:id" element={<DetailPage />}></Route>
          </Route>   
        </Routes>
      </Router>
    </>
  );
};

export default App;
