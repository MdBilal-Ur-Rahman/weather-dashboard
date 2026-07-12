import { motion } from "framer-motion";
import { useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import {
  FaMapMarkerAlt,
  FaTemperatureHigh,
  FaWind,
  FaTint,
} from "react-icons/fa";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const WeatherMap = ({ weather }) => {
  if (!weather) return null;

  const latitude = weather.lat ?? 17.385;
  const longitude = weather.lon ?? 78.4867;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="rounded-[35px] border border-white/15 bg-white/10 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] backdrop-blur-3xl"
    >
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">
            Live Location
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Weather Map
          </h2>

        </div>

        <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center">

          <p className="text-sm text-white/60">
            Current City
          </p>

          <h3 className="text-lg font-semibold text-white">
            {weather.city}, {weather.country}
          </h3>

        </div>

      </div>

      {/* Weather Summary */}

      <div className="mt-6 grid gap-4 md:grid-cols-4">

        <div className="rounded-2xl bg-white/10 p-4 text-center">

          <FaTemperatureHigh className="mx-auto text-2xl text-orange-300" />

          <p className="mt-2 text-white/60">
            Temperature
          </p>

          <h3 className="text-xl font-bold text-white">
            {weather.temp}°C
          </h3>

        </div>

        <div className="rounded-2xl bg-white/10 p-4 text-center">

          <FaWind className="mx-auto text-2xl text-cyan-300" />

          <p className="mt-2 text-white/60">
            Wind
          </p>

          <h3 className="text-xl font-bold text-white">
            {weather.wind} m/s
          </h3>

        </div>

        <div className="rounded-2xl bg-white/10 p-4 text-center">

          <FaTint className="mx-auto text-2xl text-blue-300" />

          <p className="mt-2 text-white/60">
            Humidity
          </p>

          <h3 className="text-xl font-bold text-white">
            {weather.humidity}%
          </h3>

        </div>

        <div className="rounded-2xl bg-white/10 p-4 text-center">

          <FaMapMarkerAlt className="mx-auto text-2xl text-red-300" />

          <p className="mt-2 text-white/60">
            Coordinates
          </p>

          <h3 className="text-sm font-semibold text-white">
            {latitude.toFixed(2)}, {longitude.toFixed(2)}
          </h3>

        </div>

      </div>

      {/* Map */}

      <div className="mt-8 overflow-hidden rounded-[30px] border border-white/15 max-w-full min-w-0">

        <MapContainer
          // ensure map updates when location changes
          key={`map-${latitude}-${longitude}`}
          className="w-full max-w-full min-w-0 overflow-hidden"
          center={[latitude, longitude]}
          zoom={10}
          scrollWheelZoom
          // explicit pixel height to avoid CSS collapsing in some layouts
          style={{ width: "100%", height: 500 }}
          // when map is created, invalidate size to render tiles correctly
          whenCreated={useCallback((map) => {
            setTimeout(() => map.invalidateSize(), 100);
          }, [])}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[latitude, longitude]}>

            <Popup>

              <div className="space-y-2">

                <h3 className="text-lg font-bold">
                  {weather.city}, {weather.country}
                </h3>

                <p>
                  🌤 {weather.weather}
                </p>

                <p>
                  🌡 {weather.temp}°C
                </p>

                <p>
                  💧 {weather.humidity}%
                </p>

                <p>
                  💨 {weather.wind} m/s
                </p>

                <p>
                  📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}
                </p>

              </div>

            </Popup>

          </Marker>

        </MapContainer>

      </div>
    </motion.section>
  );
};

export default WeatherMap;