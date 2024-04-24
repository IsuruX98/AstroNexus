import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"; // Import useNavigate
import Home from "../pages/Home";
import AstronomyPictureOfDay from "../pages/AstronomyPictureOfDay";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apd" element={<AstronomyPictureOfDay />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
