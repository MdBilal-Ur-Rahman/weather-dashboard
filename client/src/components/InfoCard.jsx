import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
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

// ======================================
// OpenWeather Official Icon
// ======================================
const WeatherIcon = ({
  icon,
  size = 110,
  alt = "Weather",
}) => {
  const code = icon || "01d";

  return (
    <img
      src={`https://openweathermap.org/img/wn/${code}@4x.png`}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      draggable={false}
      className="select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
    />
  );
};

// ======================================
// Weather Stat Card
// ======================================
const WeatherStat = ({ icon, title, value }) => (
  <motion.div
    whileHover={{
      y: -6,
      scale: 1.04,
    }}
    className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
  >
    <div className="flex justify-center text-4xl text-white">
      {icon}
    </div>

    <p className="mt-3 text-center text-sm text-white/70">
      {title}
    </p>

    <h3 className="mt-2 text-center text-xl font-bold text-white">
      {value}
    </h3>
  </motion.div>
);

// ======================================
// Weather Visual Card
// ======================================
const WeatherVisual = ({
  icon,
  condition,
  temperature,
}) => {
  const backgrounds = {
    Clear:
      "from-amber-400/30 via-orange-400/20 to-yellow-300/10",

    Clouds:
      "from-slate-500/30 via-slate-400/20 to-sky-400/10",

    Rain:
      "from-sky-600/30 via-cyan-500/20 to-blue-500/10",

    Drizzle:
      "from-sky-500/30 via-cyan-400/20 to-blue-500/10",

    Thunderstorm:
      "from-violet-500/30 via-indigo-500/20 to-slate-700/10",

    Snow:
      "from-slate-200/30 via-cyan-100/20 to-sky-200/10",

    Mist:
      "from-slate-500/20 via-gray-400/20 to-slate-300/10",

    Fog:
      "from-slate-500/20 via-gray-400/20 to-slate-300/10",
  };

  const bg =
    backgrounds[condition] || backgrounds.Clear;

  return (
    <div
      className={`relative flex h-56 w-full max-w-[240px] items-center justify-center overflow-hidden rounded-[30px] border border-white/20 bg-gradient-to-br ${bg} p-6 shadow-inner`}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

      <div className="relative text-center">
        <WeatherIcon
          icon={icon}
          size={120}
          alt={condition}
        />

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-white/70">
          {condition}
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

  const weatherIcon = useMemo(() => {
    if (weatherInfo.icon) return weatherInfo.icon;

    const map = {
      Clear: "01d",
      Clouds: "03d",
      Rain: "10d",
      Drizzle: "09d",
      Thunderstorm: "11d",
      Snow: "13d",
      Mist: "50d",
      Fog: "50d",
      Haze: "50d",
      Smoke: "50d",
    };

    return map[weatherInfo.weather] || "01d";
  }, [weatherInfo]);

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
            icon={weatherIcon}
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
          icon={
            <WeatherIcon
              icon={weatherIcon}
              size={55}
              alt={weatherInfo.weather}
            />
          }
          title="Condition"
          value={weatherInfo.weather}
        />
      </div>
    </motion.div>
  );
};

export default InfoCard;