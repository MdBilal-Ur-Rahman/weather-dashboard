const axios = require("axios");

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    appid: process.env.WEATHER_API_KEY,
    units: "metric",
  },
});

// ======================================
// Helper
// ======================================
const handleError = (error, fallback) => {
  const err = new Error(
    error.response?.data?.message || fallback
  );

  err.status = error.response?.status || 500;

  throw err;
};

// ======================================
// Current Weather By City
// ======================================
const fetchWeatherByCity = async (city) => {
  try {
    const { data } = await weatherApi.get("/weather", {
      params: {
        q: city,
      },
    });

    return data;
  } catch (error) {
    handleError(error, "Unable to fetch weather");
  }
};

// ======================================
// Current Weather By Location
// ======================================
const fetchWeatherByLocation = async (lat, lon) => {
  try {
    const { data } = await weatherApi.get("/weather", {
      params: {
        lat,
        lon,
      },
    });

    return data;
  } catch (error) {
    handleError(error, "Unable to fetch location weather");
  }
};

// ======================================
// 5 Day Forecast By City
// ======================================
const fetchForecastByCity = async (city) => {
  try {
    const { data } = await weatherApi.get("/forecast", {
      params: {
        q: city,
      },
    });

    return data.list;
  } catch (error) {
    handleError(error, "Unable to fetch forecast");
  }
};

// ======================================
// Hourly Forecast
// ======================================
const fetchHourlyForecast = async (city) => {
  try {
    const { data } = await weatherApi.get("/forecast", {
      params: {
        q: city,
      },
    });

    return data.list.slice(0, 8);
  } catch (error) {
    handleError(error, "Unable to fetch hourly forecast");
  }
};

// ======================================
// Air Quality
// ======================================
const fetchAirQuality = async (lat, lon) => {
  try {
    const { data } = await weatherApi.get("/air_pollution", {
      params: {
        lat,
        lon,
      },
    });

    const air = data.list?.[0];

    if (!air) {
      throw new Error("Air quality data unavailable");
    }

    return {
      aqi: air.main.aqi,
      co: Number(air.components.co.toFixed(2)),
      no2: Number(air.components.no2.toFixed(2)),
      o3: Number(air.components.o3.toFixed(2)),
      pm2_5: Number(air.components.pm2_5.toFixed(2)),
      pm10: Number(air.components.pm10.toFixed(2)),
    };
  } catch (error) {
    handleError(error, "Unable to fetch air quality");
  }
};

module.exports = {
  fetchWeatherByCity,
  fetchWeatherByLocation,
  fetchForecastByCity,
  fetchHourlyForecast,
  fetchAirQuality,
};