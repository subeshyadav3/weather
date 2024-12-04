import { useEffect } from 'preact/hooks';
import { useState } from 'react';

export function Api() {
  const [city, setCity] = useState("Kathmandu");
  const [data, setData] = useState(null);
  const [show, setShow] = useState(null);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getWeather(); // for default
    const getRecord = JSON.parse(localStorage.getItem("cities"));
    if (getRecord) {
      Object.values(getRecord).forEach((value) => {
        cities.push(value);
      });
    }
  }, []);

  async function getWeather() {
    setShow(city);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc724fc1382669595cfbe6798cca3cb6`
      );
      const result = await response.json();

      if (result.cod === "404") {
        setData(null);
      } else {
        setData(result);
        if (!(cities[0] === city)) {
          // records of searched city
          const updatedCities = [city, ...cities];
          setCities(updatedCities);
          localStorage.setItem("cities", JSON.stringify(updatedCities));
        }
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }

    setTimeout(() => {
      loadCities(); // Call after 1 second
    }, 1000);
  }

  function loadCities() {
    return (
      <>
        <p className="text-blue-500 text-2xl font-semibold mb-4">Previous Searches</p>
        <ul className="space-y-2">
          {cities.map((e, index) =>
            index > 5 ? null : (
              <li
                key={index}
                className="text-gray-700 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200 "
              >
                {e}
              </li>
            )
          )}
        </ul>
      </>
    );
  }

  return (
    <div className="home-page flex flex-col justify-center items-center py-10 px-5 bg-gradient-to-r from-blue-600 via-blue-200 to-blue-600 mt-5">
      <div className="p-5 flex flex-row justify-center items-center gap-3 mt-5">
        <input
          type="text"
          className="rounded-xl h-12 text-black px-4 sm:w-[400px] shadow-md transition-all duration-300 focus:ring focus:ring-orange-400 focus:scale-105"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="Search for a city, e.g., Pokhara, London..."
        />
        <button
          className="rounded-xl bg-orange-500 w-24 h-12 text-black font-semibold hover:bg-orange-600 active:scale-95 transition-all"
          onClick={getWeather}
        >
          Search
        </button>
      </div>
      <div className="m-2 text-center text-2xl font-semibold text-black">
        <p>
          {data
            ? "Showing Result For:"
            : "No Data Available. Type a valid city and search."}{" "}
          <span className="text-green-700">{show}</span>
        </p>
      </div>
      <div className="p-5 w-full flex flex-col md:flex-row gap-5">
        <div
          className={`w-full md:w-1/2 bg-white text-black shadow-md rounded-lg p-5 transition-opacity duration-500 ${
            data ? "opacity-100" : "opacity-0"
          }`}
        >
          {data && (
            <>
              <p className="text-xl font-semibold">Location: {data.name}, {data.sys.country}</p>
              <p>Temperature: {((data.main.temp) - 273.15).toFixed(2)} °C</p>
              <p>Min Temperature: {(data.main.temp_min - 273.15).toFixed(2)} °C</p>
              <p>Max Temperature: {(data.main.temp_max - 273.15).toFixed(2)} °C</p>
              <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString()-12}</p>
              <p>Weather: {data.weather[0].description}</p>
              <p>Humidity: {data.main.humidity}%</p>
              <p>Wind Speed: {data.wind.speed} m/s</p>
            </>
          )}
        </div>
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-5">
          {loadCities()}
        </div>
      </div>
    </div>
  );
}
