const API_URL = import.meta.env.VITE_API_URL;

// ======================================
// Helper
// ======================================
const fetchJson = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// ======================================
// Format Weather Object
// ======================================
const formatWeather = (data) => ({
  city: data.city,
  country: data.country,

  temperature: Math.round(data.temperature),
  temp: Math.round(data.temperature),
  feelsLike: Math.round(data.feelsLike),

  tempMin: Math.round(data.tempMin),
  tempMax: Math.round(data.tempMax),

  humidity: data.humidity,
  pressure: data.pressure,

  visibility: data.visibility,

  windSpeed: data.windSpeed,
  wind: data.windSpeed,

  weather: data.weather,
  description: data.description,

  lat: data.lat,
  lon: data.lon,
});

// ======================================
// Current Weather By City
// ======================================
export const getWeatherData = async (city) => {
  const response = await fetchJson(
    `${API_URL}/weather/${encodeURIComponent(city)}`
  );

  return formatWeather(response.data);
};

// ======================================
// Current Weather By Location
// ======================================
export const getWeatherByLocation = async (lat, lon) => {
  const response = await fetchJson(
    `${API_URL}/weather/location?lat=${lat}&lon=${lon}`
  );

  return formatWeather(response.data);
};

// ======================================
// Forecast
// ======================================
export const getForecast = async (city) => {
  const response = await fetchJson(
    `${API_URL}/weather/forecast/${encodeURIComponent(
      city.city || city
    )}`
  );

  return response.data;
};

// ======================================
// Forecast By Location
// ======================================
export const getForecastByLocation = async (lat, lon) => {
  const weather = await getWeatherByLocation(lat, lon);
  return getForecast(weather.city);
};

// ======================================
// Hourly Forecast
// ======================================
export const getHourlyForecast = async (city) => {
  const response = await fetchJson(
    `${API_URL}/weather/hourly/${encodeURIComponent(
      city.city || city
    )}`
  );

  return response.data;
};

// ======================================
// Hourly Forecast By Location
// ======================================
export const getHourlyForecastByLocation = async (lat, lon) => {
  const weather = await getWeatherByLocation(lat, lon);
  return getHourlyForecast(weather.city);
};

// ======================================
// Air Quality
// ======================================
export const getAirQuality = async (lat, lon) => {
  const response = await fetchJson(
    `${API_URL}/weather/air-quality?lat=${lat}&lon=${lon}`
  );

  return response.data;
};