import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
} from "react-icons/wi";

import { FaLocationDot, FaEye } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "../services/favoriteApi";

const getWeatherIcon = (weather, size = 110) => {
  switch (weather?.toLowerCase()) {
    case "clear":
      return (
        <WiDaySunny
          size={size}
          className="text-yellow-300 drop-shadow-[0_0_30px_rgba(251,191,36,0.45)]"
        />
      );

    case "clouds":
      return (
        <WiCloud
          size={size}
          className="text-slate-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.12)]"
        />
      );

    case "rain":
    case "drizzle":
      return (
        <WiRain
          size={size}
          className="text-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]"
        />
      );

    case "snow":
      return (
        <WiSnow
          size={size}
          className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
        />
      );

    case "thunderstorm":
      return (
        <WiThunderstorm
          size={size}
          className="text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.45)]"
        />
      );

    default:
      return (
        <WiDaySunny
          size={size}
          className="text-yellow-300 drop-shadow-[0_0_30px_rgba(251,191,36,0.45)]"
        />
      );
  }
};

const WeatherStat = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ y: -6, scale: 1.04 }}
    className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
  >
    <div className="flex justify-center text-4xl text-white">{icon}</div>

    <p className="mt-3 text-center text-sm text-white/70">
      {title}
    </p>

    <h3 className="mt-2 text-center text-xl font-bold text-white">
      {value}
    </h3>
  </motion.div>
);

const WeatherVisual = ({ condition = "clear", temperature = 0 }) => {
  const visuals = {
    clear: {
      emoji: "☀️",
      title: "Sunny",
      bg: "from-amber-400/30 via-orange-400/20 to-yellow-300/10",
    },
    clouds: {
      emoji: "☁️",
      title: "Cloudy",
      bg: "from-slate-500/30 via-slate-400/20 to-sky-400/10",
    },
    rain: {
      emoji: "🌧️",
      title: "Rainy",
      bg: "from-sky-600/30 via-cyan-500/20 to-blue-500/10",
    },
    drizzle: {
      emoji: "🌦️",
      title: "Drizzle",
      bg: "from-sky-500/30 via-cyan-400/20 to-blue-500/10",
    },
    snow: {
      emoji: "❄️",
      title: "Snow",
      bg: "from-slate-200/30 via-cyan-100/20 to-sky-200/10",
    },
    thunderstorm: {
      emoji: "⛈️",
      title: "Storm",
      bg: "from-violet-500/30 via-indigo-500/20 to-slate-600/10",
    },
  };

  const current =
    visuals[condition?.toLowerCase()] || visuals.clear;

  return (
    <div
      className={`relative flex h-56 w-full max-w-[240px] items-center justify-center overflow-hidden rounded-[30px] border border-white/20 bg-gradient-to-br ${current.bg} p-6 shadow-inner`}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      <div className="relative text-center">
        <div className="text-7xl">{current.emoji}</div>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
          {current.title}
        </p>

        <p className="mt-2 text-4xl font-bold text-white">
          {temperature}°
        </p>
      </div>
    </div>
  );
};

const InfoCard = ({ weatherInfo, onFavoritesChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    const loadFavorite = async () => {
      try {
        const favorites = await getFavorites();

        const found = favorites.find(
          (item) =>
            item.city.toLowerCase() ===
            weatherInfo.city.toLowerCase()
        );

        if (found) {
          setFavoriteId(found._id);
          setIsFavorite(true);
        } else {
          setFavoriteId(null);
          setIsFavorite(false);
        }
      } catch (err) {
        console.error("Load Favorite Error:", err);
      }
    };

    if (weatherInfo?.city) {
      loadFavorite();
    }
  }, [weatherInfo]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await deleteFavorite(favoriteId);

        setFavoriteId(null);
        setIsFavorite(false);
      } else {
        const saved = await addFavorite(
          weatherInfo.city,
          weatherInfo.country
        );

        const favorite = saved.data || saved;

        setFavoriteId(favorite._id);
        setIsFavorite(true);
      }

      if (onFavoritesChange) {
        await onFavoritesChange();
      }
    } catch (err) {
      console.error("Favorite Error:", err);
      alert(err.message || "Unable to update favorite.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-4xl border border-white/20 bg-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
    >
      <div className="bg-linear-to-br from-cyan-500 via-sky-500 to-blue-700 p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <FaLocationDot className="text-2xl text-red-400" />

                <div className="min-w-0">
                  <h2 className="truncate text-3xl font-bold text-white">
                    {weatherInfo.city}
                    {weatherInfo.country &&
                      `, ${weatherInfo.country}`}
                  </h2>

                  <p className="mt-1 text-sm text-white/70">
                    {today}
                  </p>
                </div>
              </div>

              <button
                onClick={handleFavorite}
                className="rounded-full bg-white/20 p-3 transition hover:bg-white/30 flex-shrink-0"
              >
                {isFavorite ? (
                  <FaHeart
                    size={24}
                    className="text-red-500"
                  />
                ) : (
                  <FaRegHeart
                    size={24}
                    className="text-white"
                  />
                )}
              </button>
            </div>

            <div className="mt-8 min-w-0">
              <h1 className="truncate text-6xl font-extrabold text-white sm:text-8xl">
                {Math.round(weatherInfo.temp)}°
              </h1>

              <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full bg-white/15 px-5 py-3 text-sm text-white/90">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300"></span>

                <span className="truncate capitalize max-w-full">
                  {weatherInfo.description ||
                    weatherInfo.weather}
                </span>
              </div>
            </div>
          </div>

          <WeatherVisual
            condition={weatherInfo.weather}
            temperature={Math.round(weatherInfo.temp)}
          />
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <WeatherStat
          icon={<WiThermometer />}
          title="Feels Like"
          value={`${Math.round(weatherInfo.feelsLike || 0)}°`}
        />

        <WeatherStat
          icon={<WiHumidity />}
          title="Humidity"
          value={`${weatherInfo.humidity}%`}
        />

        <WeatherStat
          icon={<WiStrongWind />}
          title="Wind"
          value={`${weatherInfo.wind} m/s`}
        />

        <WeatherStat
          icon={<WiBarometer />}
          title="Pressure"
          value={`${weatherInfo.pressure} hPa`}
        />

        <WeatherStat
          icon={<FaEye />}
          title="Visibility"
          value={`${weatherInfo.visibility} km`}
        />

        <WeatherStat
          icon={getWeatherIcon(weatherInfo.weather, 40)}
          title="Condition"
          value={weatherInfo.weather}
        />
      </div>
    </motion.div>
  );
};

export default InfoCard;