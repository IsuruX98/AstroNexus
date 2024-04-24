import React, { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const EPIC = () => {
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const API_KEY = "yzm8fkqDoiRhP8zP2neQ1FxtMPyASrB5WggSObDI"; // Replace with your API key

  const fetchImageData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${API_KEY}`
      );
      setImageData(response.data);
    } catch (error) {
      console.error("Error fetching image data:", error);
      setError("An error occurred while fetching image data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchImageData();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white py-8 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="md:flex md:justify-between md:items-center block mb-8">
        <h1 className="text-4xl font-bold md:mb-0 mb-8">EPIC Imagery</h1>
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Click here to filter images
        </button>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 flex justify-center items-center z-20">
          <div className="bg-gray-800 rounded-lg p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <label htmlFor="date" className="block mb-2 text-lg text-white">
                Select a Date:
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                disabled={loading}
              >
                {loading ? "Loading..." : "Search"}
              </button>
              <p className="mt-3">
                TIP: The first acquired images start on 2015-09-01
              </p>
            </form>
          </div>
        </div>
      )}

      <p className="text-gray-400 text-lg mb-8">
        The EPIC API provides information on the daily imagery collected by
        DSCOVR's Earth Polychromatic Imaging Camera (EPIC) instrument. Uniquely
        positioned at the Earth-Sun Lagrange point, EPIC provides full disc
        imagery of the Earth and captures unique perspectives of certain
        astronomical events such as lunar transits using a 2048x2048 pixel CCD
        (Charge Coupled Device) detector coupled to a 30-cm aperture Cassegrain
        telescope.
        <br />
        <br />
        Development of the EPIC API began in 2015, and is supported by the web
        development team for the Laboratory for Atmospheres in the Earth
        Sciences Division of the Goddard Space Flight Center.
      </p>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {imageData && !loading && !error && imageData.length === 0 && (
        <p className="text-red-500 text-center mt-4">
          No image data available for the selected date.
        </p>
      )}
      {imageData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageData.map((image) => {
            const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date.replace(
              /-/g,
              "/"
            )}/jpg/${image.image}.jpg`;
            return (
              <div
                key={image.identifier}
                className="bg-black bg-opacity-50 rounded-lg overflow-hidden shadow-md"
              >
                <img src={imageUrl} alt={image.caption} className="w-full" />
                <div className="p-4">
                  <p className="text-xl font-semibold mb-2 text-white">
                    Date: {image.date}
                  </p>
                  <p className="text-gray-300">
                    Coordinates: {image.coords.centroid_coordinates.lat},{" "}
                    {image.coords.centroid_coordinates.lon}
                  </p>
                  <p className="text-gray-300">
                    Sun Position: X: {image.coords.sun_j2000_position.x}, Y:{" "}
                    {image.coords.sun_j2000_position.y}, Z:{" "}
                    {image.coords.sun_j2000_position.z}
                  </p>
                  <p className="text-gray-300">
                    Lunar Position: X: {image.coords.lunar_j2000_position.x}, Y:{" "}
                    {image.coords.lunar_j2000_position.y}, Z:{" "}
                    {image.coords.lunar_j2000_position.z}
                  </p>
                  <p className="text-gray-300">
                    DSCOVR Position: X: {image.coords.dscovr_j2000_position.x},
                    Y: {image.coords.dscovr_j2000_position.y}, Z:{" "}
                    {image.coords.dscovr_j2000_position.z}
                  </p>
                  <p className="text-gray-300">
                    Attitude Quaternions: Q0:{" "}
                    {image.coords.attitude_quaternions.q0}, Q1:{" "}
                    {image.coords.attitude_quaternions.q1}, Q2:{" "}
                    {image.coords.attitude_quaternions.q2}, Q3:{" "}
                    {image.coords.attitude_quaternions.q3}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EPIC;
