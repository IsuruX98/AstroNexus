import React from "react";
import { Routes, Route } from "react-router-dom"; // Import useNavigate
import Home from "../pages/Home";
import AstronomyPictureOfDay from "../pages/AstronomyPictureOfDay";
import MarsRoverPhotos from "../pages/MarsRoverPhotos";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apd" element={<AstronomyPictureOfDay />} />
      <Route path="/mrp" element={<MarsRoverPhotos />} />
    </Routes>
  );
};

export default AppRouter;
