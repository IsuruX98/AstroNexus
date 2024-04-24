import React, { useState, useEffect } from "react";
import axios from "axios";

const AstronomyPictureOfDay = () => {
  const [apodData, setApodData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateMode, setDateMode] = useState("single");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="bg-gray-900 min-h-screen text-white py-8 px-4 md:px-8 lg:px-16 xl:px-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Astronomy Picture of the Day
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="max-w-lg mx-auto mb-8">
          <label htmlFor="dateMode" className="block mb-2 text-lg">
            Choose Date Selection Mode:
          </label>
          <select
            id="dateMode"
            value={dateMode}
            onChange={(e) => setDateMode(e.target.value)}
            className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500"
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
              className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500"
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
      </form>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {apodData && (
        <div className="max-w-xl mx-auto mt-8">
          {Array.isArray(apodData) ? (
            <div>
              {apodData.map((item) => (
                <div key={item.date} className="mb-8">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="mb-2 w-full rounded-lg shadow-lg"
                  />
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="text-lg font-bold mb-4">{item.date}</p>
                  <p className="text-lg">{item.explanation}</p>
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
