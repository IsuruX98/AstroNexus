import React, { useState, useEffect } from "react";
import axios from "axios";

const AstronomyPictureOfDay = () => {
  const [apodData, setApodData] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAPOD = async (date) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=yzm8fkqDoiRhP8zP2neQ1FxtMPyASrB5WggSObDI&date=${date}`
      );
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
    fetchAPOD(date);
  }, [date]);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-8 px-4 md:px-8 lg:px-16 xl:px-24">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Astronomy Picture of the Day
      </h1>
      <div className="max-w-lg mx-auto mb-8">
        <label htmlFor="date" className="block mb-2">
          Select a date:
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white focus:outline-none focus:border-blue-500"
        />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {apodData && (
        <div className="max-w-xl mx-auto">
          <img
            src={apodData.url}
            alt={apodData.title}
            className="mb-8 w-full rounded-lg shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-4">{apodData.title}</h2>
          <p className="text-lg">{apodData.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default AstronomyPictureOfDay;
