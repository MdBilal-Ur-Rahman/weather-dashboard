import { useState } from "react";

import {
  getWeatherData,
  getWeatherByLocation,
  getForecastByLocation,
  getHourlyForecastByLocation,
  getAirQuality,
} from "../services/weatherApi";

const AQI_STATUS = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [airQuality, setAirQuality] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearData = () => {
    setWeather(null);
    setForecast([]);
    setHourly([]);
    setAirQuality(null);
  };

  const formatErrorMessage = (err) => {
    const message = err?.message || "";

    if (/404|not found/i.test(message)) {
      return "City not found. Please try another city.";
    }

    return message || "Unable to fetch weather data.";
  };

  // =====================================
  // Search By City
  // =====================================
  const searchCity = async (city) => {
    if (!city?.trim()) {
      setError("Please enter a city.");
      return null;
    }

    try {
      setLoading(true);
      setError("");

      const weatherData = await getWeatherData(city);

      const [forecastRes, hourlyRes, airRes] =
        await Promise.allSettled([
          getForecastByLocation(weatherData.lat, weatherData.lon),
          getHourlyForecastByLocation(weatherData.lat, weatherData.lon),
          getAirQuality(weatherData.lat, weatherData.lon),
        ]);

      setWeather(weatherData);

      setForecast(
        forecastRes.status === "fulfilled"
          ? forecastRes.value
          : []
      );

      setHourly(
        hourlyRes.status === "fulfilled"
          ? hourlyRes.value
          : []
      );

      if (airRes.status === "fulfilled") {
        setAirQuality({
          ...airRes.value,
          status:
            AQI_STATUS[airRes.value.aqi] || "Unknown",
        });
      } else {
        setAirQuality(null);
      }

      return weatherData;
    } catch (err) {
      // console.error("Search Error:", err);
      if (err.status !== 404) {
  console.error("Search Error:", err);
}

      clearData();

      setError(formatErrorMessage(err));

      return null;
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Current Location
  // =====================================
  const searchCurrentLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported.");
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            setLoading(true);
            setError("");

            const weatherData =
              await getWeatherByLocation(
                coords.latitude,
                coords.longitude
              );

            const [forecastRes, hourlyRes, airRes] =
              await Promise.allSettled([
                getForecastByLocation(
                  weatherData.lat,
                  weatherData.lon
                ),
                getHourlyForecastByLocation(
                  weatherData.lat,
                  weatherData.lon
                ),
                getAirQuality(
                  weatherData.lat,
                  weatherData.lon
                ),
              ]);

            setWeather(weatherData);

            setForecast(
              forecastRes.status === "fulfilled"
                ? forecastRes.value
                : []
            );

            setHourly(
              hourlyRes.status === "fulfilled"
                ? hourlyRes.value
                : []
            );

            if (airRes.status === "fulfilled") {
              setAirQuality({
                ...airRes.value,
                status:
                  AQI_STATUS[airRes.value.aqi] ||
                  "Unknown",
              });
            } else {
              setAirQuality(null);
            }

            resolve(weatherData);
          } catch (err) {
            console.error(err);

            clearData();

            setError(formatErrorMessage(err));

            resolve(null);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("Location permission denied.");
              break;

            case err.POSITION_UNAVAILABLE:
              setError(
                "Location information unavailable."
              );
              break;

            case err.TIMEOUT:
              setError("Location request timed out.");
              break;

            default:
              setError("Unable to get location.");
          }

          setLoading(false);

          resolve(null);
        }
      );
    });
  };

  return {
    weather,
    forecast,
    hourly,
    airQuality,
    loading,
    error,
    searchCity,
    searchCurrentLocation,
  };
};

export default useWeather;