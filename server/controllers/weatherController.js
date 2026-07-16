const SearchHistory = require("../models/SearchHistory");

const {
  fetchWeatherByCity,
  fetchWeatherByLocation,
  fetchForecastByCity,
  fetchAirQuality,
} = require("../services/weatherService");

// ======================================
// Format Weather Data
// ======================================
const formatWeather = (data) => ({
  city: data.name,
  country: data.sys.country,

  // Current Temperature
  temp: data.main.temp,
  temperature: data.main.temp,

  feelsLike: data.main.feels_like,

  tempMin: data.main.temp_min,
  tempMax: data.main.temp_max,

  humidity: data.main.humidity,
  pressure: data.main.pressure,

  visibility: data.visibility / 1000,

  // Wind
  wind: data.wind.speed,
  windSpeed: data.wind.speed,

  // Weather
  weather: data.weather[0].main,
  description: data.weather[0].description,
  icon: data.weather[0].icon,

  // Coordinates
  lat: data.coord.lat,
  lon: data.coord.lon,
});

// ======================================
// Save Search History
// ======================================
const saveHistory = async (weatherData) => {
  try {
    await SearchHistory.deleteMany({
      city: {
        $regex: new RegExp(`^${weatherData.city}$`, "i"),
      },
    });

    await SearchHistory.create({
      city: weatherData.city,
      country: weatherData.country,
      temperature: weatherData.temp,
    });
  } catch (err) {
    console.error("History Save Error:", err.message);
  }
};

// ======================================
// Weather By City
// ======================================
const getWeather = async (req, res) => {
  try {
    const data = await fetchWeatherByCity(req.params.city);

    const weatherData = formatWeather(data);

    await saveHistory(weatherData);

    res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    console.error(error.message);

    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Weather By Location
// ======================================
const getWeatherByLocation = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const data = await fetchWeatherByLocation(lat, lon);

    const weatherData = formatWeather(data);

    await saveHistory(weatherData);

    res.status(200).json({
      success: true,
      data: weatherData,
    });
  } catch (error) {
    console.error(error.message);

    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Forecast
// ======================================
const getForecast = async (req, res) => {
  try {
    const forecast = await fetchForecastByCity(req.params.city);

    res.status(200).json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    console.error(error.message);

    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Hourly Forecast
// ======================================
const getHourlyForecast = async (req, res) => {
  try {
    const forecast = await fetchForecastByCity(req.params.city);

    res.status(200).json({
      success: true,
      data: forecast.slice(0, 8),
    });
  } catch (error) {
    console.error(error.message);

    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Air Quality
// ======================================
const getAirQuality = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required",
      });
    }

    const air = await fetchAirQuality(lat, lon);

    res.status(200).json({
      success: true,
      data: air,
    });
  } catch (error) {
    console.error(error.message);

    res.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getWeather,
  getWeatherByLocation,
  getForecast,
  getHourlyForecast,
  getAirQuality,
};