import React from "react";
import { Routes, Route } from "react-router-dom"; // Import useNavigate
import Home from "../pages/Home";
import AstronomyPictureOfDay from "../pages/AstronomyPictureOfDay";
import MarsRoverPhotos from "../pages/MarsRoverPhotos";
import EPIC from "../pages/EPIC";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apd" element={<AstronomyPictureOfDay />} />
      <Route path="/mrp" element={<MarsRoverPhotos />} />
      <Route path="/epic" element={<EPIC />} />
    </Routes>
  );
};

export default AppRouter;
