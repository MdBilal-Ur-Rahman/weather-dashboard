import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
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

function ResizeMap({ lat, lon }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.setView([lat, lon], 12);
    }, 300);

    return () => clearTimeout(timer);
  }, [lat, lon, map]);

  return null;
}

const WeatherMap = ({ weather }) => {
  if (!weather) return null;

  const latitude = Number(weather.lat);
  const longitude = Number(weather.lon);

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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

        <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-center backdrop-blur-xl">
          <p className="text-sm text-white/60">
            Current City
          </p>

          <h3 className="text-lg font-semibold text-white">
            {weather.city}, {weather.country}
          </h3>
        </div>
      </div>

      {/* Weather Cards */}

      <div className="mt-6 grid gap-4 md:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">

          <FaTemperatureHigh className="mx-auto text-2xl text-orange-300" />

          <p className="mt-2 text-white/60">
            Temperature
          </p>

          <h3 className="text-xl font-bold text-white">
            {weather.temp}°C
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">

          <FaWind className="mx-auto text-2xl text-cyan-300" />

          <p className="mt-2 text-white/60">
            Wind Speed
          </p>

          <h3 className="text-xl font-bold text-white">
            {weather.wind} m/s
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">

          <FaTint className="mx-auto text-2xl text-blue-300" />

          <p className="mt-2 text-white/60">
            Humidity
          </p>

          <h3 className="text-xl font-bold text-white">
            {weather.humidity}%
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">

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

      <div className="mt-8 h-[380px] overflow-hidden rounded-[30px] border border-white/15 shadow-2xl md:h-[520px]">

        <MapContainer
          center={[latitude, longitude]}
          zoom={12}
          scrollWheelZoom={true}
          style={{
            width: "100%",
            height: "100%",
          }}
        >

          <ResizeMap
            lat={latitude}
            lon={longitude}
          />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[latitude, longitude]}>

            <Popup>

              <div className="min-w-[180px] space-y-2 text-center">

                <h3 className="text-lg font-bold">
                  {weather.city}, {weather.country}
                </h3>

                <p>
                  🌤 {weather.weather}
                </p>

                <p>
                  🌡 Temperature: {weather.temp}°C
                </p>

                <p>
                  💧 Humidity: {weather.humidity}%
                </p>

                <p>
                  💨 Wind: {weather.wind} m/s
                </p>

                <p className="text-xs text-gray-500">
                  {latitude.toFixed(4)}, {longitude.toFixed(4)}
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