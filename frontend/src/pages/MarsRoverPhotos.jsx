import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "../notifications/notifications";
import MarsRoverPhotoCard from "../components/MarsRoverPhotoCard/MarsRoverPhotoCard";
import Pagination from "../components/Pagination/Pagination";

const MarsRoverPhotos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [dateType, setDateType] = useState("sol");
  const [dateValue, setDateValue] = useState("");
  const [camera, setCamera] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (!user) {
      navigate("/");
      ErrorNotification("Please log in to access Mars Rover photos.");
    }
  });

  const fetchPhotos = async () => {
    setLoading(true);
    setError("");
    try {
      let url;
      if (dateType === "sol") {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${dateValue}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;
      } else {
        url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateValue}&api_key=${process.env.REACT_APP_NASA_API_KEY}`;
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = photos.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12 px-12 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-white font-bold text-4xl mb-6">
        Explore Mars Rover Photos
      </h1>
      <p className="text-gray-400 text-lg mb-8">
        This API is designed to collect image data gathered by NASA's Curiosity,
        Opportunity, and Spirit rovers on Mars and make it more easily available
        to other developers, educators, and citizen scientists. This API is
        maintained by Chris Cerami. Each rover has its own set of photos stored
        in the database, which can be queried separately. There are several
        possible queries that can be made against the API. Photos are organized
        by the sol (Martian rotation or day) on which they were taken, counting
        up from the rover's landing date. A photo taken on Curiosity's 1000th
        Martian sol exploring Mars, for example, will have a sol attribute of
        1000. If instead you prefer to search by the Earth date on which a photo
        was taken, you can do that, too.
      </p>

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
              className="block w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:bg-gray-700 focus:border-gray-500 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.7rem center",
                backgroundSize: "1.2rem",
              }}
            >
              <option value="sol">Query by Martian sol</option>
              <option value="earth_date">Query by Earth date</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 md:mt-0 mt-5">
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
            className="block w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none focus:bg-gray-700 focus:border-gray-500 appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.7rem center",
              backgroundSize: "1.2rem",
            }}
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
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {photos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.map((photo) => (
            <MarsRoverPhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(photos.length / itemsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default MarsRoverPhotos;
