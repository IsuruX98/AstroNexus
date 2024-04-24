import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const AstronomyPictureOfDay = () => {
  const [apodData, setApodData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateMode, setDateMode] = useState("single");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchAPOD = async () => {
    setLoading(true);
    try {
      let url = `https://api.nasa.gov/planetary/apod?api_key=yzm8fkqDoiRhP8zP2neQ1FxtMPyASrB5WggSObDI`;

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

  return (
    <div className="bg-gray-900 min-h-screen text-white py-8 px-4 md:px-8 lg:px-16 xl:px-32 relative">
      <div className="md:flex md:justify-between md:items-center block">
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

      {loading && <LoadingSpinner />}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="max-w-lg mx-auto mb-8">
                <label htmlFor="dateMode" className="block mb-2 text-lg">
                  Choose Date Selection Mode:
                </label>
                <select
                  id="dateMode"
                  value={dateMode}
                  onChange={(e) => setDateMode(e.target.value)}
                  className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500 appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.7rem center",
                    backgroundSize: "1.2rem",
                  }}
                >
                  <option value="single">Single Date</option>
                  <option value="range">Date Range</option>
                </select>
              </div>
              {dateMode === "single" && (
                <div className="max-w-lg mx-auto mb-8">
                  <label htmlFor="startDate" className="block mb-2 text-lg">
                    Select a Date:
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500 "
                  />
                </div>
              )}
              {dateMode === "range" && (
                <>
                  <div className="max-w-lg mx-auto mb-8">
                    <label htmlFor="startDate" className="block mb-2 text-lg">
                      Start Date:
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="max-w-lg mx-auto mb-8">
                    <label htmlFor="endDate" className="block mb-2 text-lg">
                      End Date:
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {apodData && (
        <div className="max-w-full mx-auto mt-8">
          {Array.isArray(apodData) ? (
            <div>
              {apodData.map((item) => (
                <div
                  key={item.date}
                  className="mb-8 bg-black bg-opacity-50 rounded-lg p-4 md:flex"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="mb-2 md:w-1/2 rounded-lg shadow-lg"
                  />
                  <div className="md:w-1/2 md:ml-8">
                    <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                    <p className="text-lg font-bold mb-4">{item.date}</p>
                    <p className="text-lg">{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <img
                src={apodData.url}
                alt={apodData.title}
                className="mb-8 w-full rounded-lg shadow-lg"
              />
              <h2 className="text-2xl font-bold mb-4">{apodData.title}</h2>
              <p className="text-lg font-bold mb-4">{apodData.date}</p>
              <p className="text-lg">{apodData.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AstronomyPictureOfDay;
