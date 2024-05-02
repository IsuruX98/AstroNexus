import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { ErrorNotification } from "../notifications/notifications";
import AstronomyPictureOfDayModal from "../components/Models/AstronomyPictureOfDayModal/AstronomyPictureOfDayModal";
import ApodItem from "../components/ApodItem/ApodItem";
import Pagination from "../components/Pagination/Pagination";

const AstronomyPictureOfDay = () => {
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();
  const [apodData, setApodData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateMode, setDateMode] = useState("single");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
      ErrorNotification(
        "Please log in to access Astronomy Picture of the Day."
      );
    }
  }, [authLoading, user, navigate]);

  const fetchAPOD = async () => {
    setLoading(true);
    try {
      let url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`;

      if (dateMode === "single" && startDate) {
        url += `&date=${startDate}`;
      } else if (dateMode === "range" && startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
      }

      const response = await axios.get(url);
      setApodData(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, [startDate, endDate, dateMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAPOD();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(apodData)
    ? apodData.slice(indexOfFirstItem, indexOfLastItem)
    : 1;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (authLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white py-12 px-12 md:px-8 lg:px-16 xl:px-32 relative">
      <div className="md:flex md:justify-between md:items-center block mb-8">
        <h1 className="text-4xl font-bold md:mb-0 mb-8">
          Astronomy Picture of the Day
        </h1>
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition-all duration-150 hover:bg-[#d1d5db] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Click here to filter images
        </button>
      </div>

      <p className="text-gray-400 text-lg mb-8">
        One of the most popular websites at NASA is the Astronomy Picture of the
        Day. In fact, this website is one of the most popular websites across
        all federal agencies. It has the popular appeal of a Justin Bieber
        video. This endpoint structures the APOD imagery and associated metadata
        so that it can be repurposed for other applications. In addition, if the
        concept_tags parameter is set to True, then keywords derived from the
        image explanation are returned. These keywords could be used as
        auto-generated hashtags for twitter or instagram feeds; but generally
        help with discoverability of relevant imagery.
      </p>

      {loading && <LoadingSpinner />}
      {modalOpen && (
        <AstronomyPictureOfDayModal
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          dateMode={dateMode}
          setDateMode={setDateMode}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {apodData && (
        <div className="max-w-full mx-auto mt-8">
          {Array.isArray(apodData) ? (
            <div>
              {currentItems.map((item) => (
                <ApodItem key={item.date} item={item} />
              ))}
            </div>
          ) : (
            <ApodItem item={apodData} />
          )}
        </div>
      )}

      {Array.isArray(apodData) && (
        <Pagination
          currentPage={currentPage}
          totalPages={
            Array.isArray(apodData) && Math.ceil(apodData.length / itemsPerPage)
          }
          onPageChange={paginate}
        />
      )}
    </div>
  );
};

export default AstronomyPictureOfDay;
