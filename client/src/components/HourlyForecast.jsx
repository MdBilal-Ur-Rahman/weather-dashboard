import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiStrongWind,
  WiHumidity,
} from "react-icons/wi";

const getWeatherIcon = (weather) => {
  const condition = weather?.toLowerCase() || "";

  switch (condition) {
    case "clear":
      return <WiDaySunny size={60} className="text-yellow-300" />;

    case "clouds":
      return <WiCloud size={60} className="text-gray-200" />;

    case "rain":
    case "drizzle":
      return <WiRain size={60} className="text-blue-300" />;

    case "snow":
      return <WiSnow size={60} className="text-white" />;

    case "thunderstorm":
      return <WiThunderstorm size={60} className="text-yellow-400" />;

    default:
      return <WiCloud size={60} className="text-white" />;
  }
};

const HourlyForecast = ({ hourly = [] }) => {
  if (!Array.isArray(hourly) || hourly.length === 0) {
    return null;
  }

  // Next 24 Hours (3hr interval = 8 cards)
  const nextHours = hourly.slice(0, 8);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[35px] border border-white/15 bg-white/10 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.18)] backdrop-blur-3xl"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          Hourly Forecast
        </h2>

        <p className="mt-1 text-sm text-white/60">
          Next 24 Hours Weather
        </p>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
        {nextHours.map((item, index) => (
          <motion.div
            key={item.dt || index}
            whileHover={{
              y: -8,
              scale: 1.04,
            }}
            className="min-w-[150px] max-w-[180px] flex-shrink-0 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl transition"
          >
            <p className="text-center text-white/70">
              {new Date(item.dt_txt).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>

            <div className="my-4 flex justify-center">
              {getWeatherIcon(item.weather?.[0]?.main)}
            </div>

            <h3 className="text-center text-4xl font-bold text-white">
              {Math.round(item.main.temp)}°
            </h3>

            <p className="mt-2 text-center text-sm capitalize text-white/70">
              {item.weather?.[0]?.description}
            </p>

            <div className="mt-5 space-y-2">

              <div className="flex items-center justify-between text-white/80">
                <span className="flex items-center gap-1">
                  <WiHumidity size={24} />
                  Humidity
                </span>

                <span>{item.main.humidity}%</span>
              </div>

              <div className="flex items-center justify-between text-white/80">
                <span className="flex items-center gap-1">
                  <WiStrongWind size={24} />
                  Wind
                </span>

                <span>{item.wind.speed} m/s</span>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default HourlyForecast;