import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "../notifications/notifications";
import EPICModal from "../components/Models/EPICModal/EPICModal";
import EPICImage from "../components/EPICImage/EPICImage";
import Pagination from "../components/Pagination/Pagination";

const EPIC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [date, setDate] = useState("");
  const [imageData, setImageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (!user) {
      navigate("/");
      ErrorNotification(
        "Please log in to access Earth Polychromatic Imaging Camera Images."
      );
    }
  });

  const fetchImageData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.nasa.gov/EPIC/api/natural/date/${date}?api_key=${process.env.REACT_APP_NASA_API_KEY}`
      );
      setImageData(response.data);
      if (response.data.length === 0) {
        setError("* No image data available for the selected date.");
      }
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imageData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12 px-12 md:px-8 lg:px-16 xl:px-32">
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
        <EPICModal
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          date={date}
          setDate={setDate}
          loading={loading}
        />
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
      {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
      {!loading && !error && imageData.length === 0 && (
        <p className="text-white font-bold mt-4">
          * Enter a date to search for EPIC imagery using Filter Images button.
        </p>
      )}
      {currentItems && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {currentItems.map((image) => (
            <EPICImage key={image.identifier} image={image} date={date} />
          ))}
        </div>
      )}
      {imageData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(imageData.length / itemsPerPage)}
          onPageChange={paginate}
        />
      )}
    </div>
  );
};

export default EPIC;
