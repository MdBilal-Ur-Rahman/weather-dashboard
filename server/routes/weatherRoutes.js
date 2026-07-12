const express = require("express");

const router = express.Router();

const {
  getWeather,
  getWeatherByLocation,
  getForecast,
  getHourlyForecast,
  getAirQuality,
} = require("../controllers/weatherController");

// ======================================
// Air Quality
// ======================================
router.get("/air-quality", getAirQuality);

// ======================================
// Weather By Current Location
// ======================================
router.get("/location", getWeatherByLocation);

// ======================================
// Hourly Forecast
// ======================================
router.get("/hourly/:city", getHourlyForecast);

// ======================================
// 5 Day Forecast
// ======================================
router.get("/forecast/:city", getForecast);

// ======================================
// Current Weather
// ======================================
router.get("/:city", getWeather);

module.exports = router;