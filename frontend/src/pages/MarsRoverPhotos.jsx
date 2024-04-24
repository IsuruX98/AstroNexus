import React, { useState } from "react";
import axios from "axios";

const MarsRoverPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [dateType, setDateType] = useState("sol");
  const [dateValue, setDateValue] = useState("");
  const [camera, setCamera] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "yzm8fkqDoiRhP8zP2neQ1FxtMPyASrB5WggSObDI";

  const fetchPhotos = async () => {
    setLoading(true);
    setError("");
    try {
      let url;
      if (dateType === "sol") {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${dateValue}&api_key=${API_KEY}`;
      } else {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateValue}&api_key=${API_KEY}`;
      }
      if (camera !== "all") {
        url += `&camera=${camera}`;
      }
      const response = await axios.get(url);
      setPhotos(response.data.photos);
      if (response.data.photos.length === 0) {
        setError("No photos found for the given inputs.");
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
      setError(
        "An error occurred while fetching photos. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDateTypeChange = (event) => {
    setDateType(event.target.value);
  };

  const handleDateValueChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleCameraChange = (event) => {
    setCamera(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPhotos();
  };

  return (
    <div className="bg-gray-900 2xl:pb-72 lg:px-32 lg:py-20 px-12 py-12">
      <h1 className="text-white text-3xl mb-6">Explore Mars Rover Photos</h1>
      <p className="text-gray-300 mb-6">
        Select how you want to search for photos: by Martian sol or Earth date.
        Enter the corresponding value, and optionally filter by camera. Click
        "Search" to view photos.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/2">
            <label htmlFor="dateType" className="text-white block mb-1">
              Query Type
            </label>
            <select
              id="dateType"
              value={dateType}
              onChange={handleDateTypeChange}
              className="block w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:bg-gray-700 focus:border-gray-500"
            >
              <option value="sol">Query by Martian sol</option>
              <option value="earth_date">Query by Earth date</option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="dateValue" className="text-white block mb-1">
              {dateType === "sol" ? "Martian Sol" : "Earth Date"}
            </label>
            <input
              id="dateValue"
              type={dateType === "sol" ? "number" : "date"}
              value={dateValue}
              onChange={handleDateValueChange}
              className="block w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:bg-gray-700 focus:border-gray-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="camera" className="text-white block mb-1 mt-4">
            Camera
          </label>
          <select
            id="camera"
            value={camera}
            onChange={handleCameraChange}
            className="block w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:bg-gray-700 focus:border-gray-500"
          >
            <option value="all">All Cameras</option>
            <option value="FHAZ">Front Hazard Avoidance Camera</option>
            <option value="RHAZ">Rear Hazard Avoidance Camera</option>
            <option value="MAST">Mast Camera</option>
            <option value="CHEMCAM">Chemistry and Camera Complex</option>
            <option value="MAHLI">Mars Hand Lens Imager</option>
            <option value="MARDI">Mars Descent Imager</option>
            <option value="NAVCAM">Navigation Camera</option>
            <option value="PANCAM">Panoramic Camera</option>
            <option value="MINITES">
              Miniature Thermal Emission Spectrometer (Mini-TES)
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {photos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={photo.img_src}
                alt="Mars Rover"
                className="w-full h-auto"
              />
              <div className="p-4">
                <p className="text-gray-800 font-semibold mb-2">
                  {photo.camera.full_name}
                </p>
                <p className="text-gray-600">Sol: {photo.sol}</p>
                <p className="text-gray-600">Earth Date: {photo.earth_date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarsRoverPhotos;