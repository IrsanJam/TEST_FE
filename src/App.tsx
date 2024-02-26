import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/old/Homepage";
import DetailPage from "./pages/old/DetailPage";
// import Home from "./pages/Real/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/detail/:id" element={<DetailPage />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
