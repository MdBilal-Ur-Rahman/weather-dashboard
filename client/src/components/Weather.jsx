import { Suspense, lazy, useEffect, useState } from "react";
import { motion } from "framer-motion";

import Header from "./Header";
import SearchBox from "./SearchBox";
import InfoCard from "./InfoCard";
import WeatherDetails from "./WeatherDetails";
import Forecast from "./Forecast";
import Loader from "./Loader";

const WeatherMap = lazy(() => import("./WeatherMap"));
const FavoriteCities = lazy(() => import("./FavoriteCities"));
const RecentSearches = lazy(() => import("./RecentSearches"));
const HourlyForecast = lazy(() => import("./HourlyForecast"));
const AirQuality = lazy(() => import("./AirQuality"));

import useWeather from "../hooks/useWeather";
import { getFavorites } from "../services/favoriteApi";
import { getHistory } from "../services/historyApi";

const Weather = () => {
  const {
    weather,
    forecast,
    hourly,
    airQuality,
    loading,
    error,
    searchCity,
    searchCurrentLocation,
  } = useWeather();

  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // ===============================
  // Load Favorites
  // ===============================
  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Favorites Error:", err);
      setFavorites([]);
    }
  };

  // ===============================
  // Load Search History
  // ===============================
  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setRecentSearches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("History Error:", err);
      setRecentSearches([]);
    }
  };

  // ===============================
  // Initial Load
  // ===============================
  useEffect(() => {
    const initWeather = async () => {
      await loadFavorites();

      const weatherData = await searchCity("Hyderabad");

      if (weatherData) {
        await loadHistory();
      }
    };

    initWeather();
  }, []);

  // ===============================
  // Refresh Saved Data
  // ===============================
  const refreshSavedData = async () => {
    await Promise.all([
      loadFavorites(),
      loadHistory(),
    ]);
  };

  // ===============================
  // Search City
  // ===============================
  const handleSearch = async (city) => {
    const weatherData = await searchCity(city);

    if (weatherData) {
      await refreshSavedData();
    }
  };

  // ===============================
  // Current Location
  // ===============================
  const handleUseLocation = async () => {
    const weatherData = await searchCurrentLocation();

    if (weatherData) {
      await refreshSavedData();
    }
  };

  // ===============================
  // Select From History/Favorites
  // ===============================
  const handleSelectCity = async (city) => {
    const weatherData = await searchCity(city);

    if (weatherData) {
      await refreshSavedData();
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-10"
      >
        <div className="space-y-8">

          {/* Header */}
          <div className="rounded-[40px] border border-white/15 bg-white/10 p-6 shadow-[0_30px_80px_rgba(0,0,0,.18)] backdrop-blur-3xl lg:p-10">
            <Header />

            <div className="mt-6">
              <SearchBox
                onSearch={handleSearch}
                onUseLocation={handleUseLocation}
              />
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.5fr_0.7fr]">

            {/* LEFT */}
            <div className="space-y-8">

              <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
                  Live Overview
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white">
                    Search any city
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white">
                    Save Favorites
                  </span>

                  <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm text-white">
                    Recent Searches
                  </span>
                </div>
              </div>

              {error && (
                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-100">
                  {error}
                </div>
              )}

              {loading ? (
                <Loader />
              ) : (
                weather && (
                  <InfoCard
                    weatherInfo={weather}
                    onFavoritesChange={refreshSavedData}
                  />
                )
              )}
            </div>

            {/* RIGHT */}
            <div className="space-y-8">

              <div className="rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
                  Quick Access
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  Favorites & Recent Searches
                </h2>
              </div>

              <Suspense
                fallback={
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
                    Loading Favorites...
                  </div>
                }
              >
                <FavoriteCities
                  favorites={favorites}
                  onSelectCity={handleSelectCity}
                  onFavoritesChange={refreshSavedData}
                />
              </Suspense>

              <Suspense
                fallback={
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
                    Loading Recent Searches...
                  </div>
                }
              >
                <RecentSearches
                  recentSearches={recentSearches}
                  onSelectCity={handleSelectCity}
                  onRefresh={refreshSavedData}
                />
              </Suspense>

            </div>
          </div>

          {/* Weather Sections */}
          {!loading && weather && (
            <div className="mt-8 space-y-8">

              <WeatherDetails weather={weather} />

              <Suspense
                fallback={
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white">
                    Loading Air Quality...
                  </div>
                }
              >
                <AirQuality airQuality={airQuality} />
              </Suspense>

              <Suspense
                fallback={
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white">
                    Loading Weather Map...
                  </div>
                }
              >
                <WeatherMap weather={weather} />
              </Suspense>

              <Suspense
                fallback={
                  <div className="rounded-3xl border border-white/10 bg-white/10 p-8 text-white">
                    Loading Hourly Forecast...
                  </div>
                }
              >
                <HourlyForecast hourly={hourly} />
              </Suspense>

              <Forecast forecast={forecast} />

            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
};

export default Weather;