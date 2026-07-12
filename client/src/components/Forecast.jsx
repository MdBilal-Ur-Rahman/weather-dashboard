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

const getIcon = (weather = "") => {
  switch (weather.toLowerCase()) {
    case "clear":
      return <WiDaySunny size={60} className="text-yellow-300" />;
    case "clouds":
      return <WiCloud size={60} className="text-slate-200" />;
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

const getDailyForecast = (forecast = []) => {
  const dayMap = {};

  forecast.forEach((item) => {
    if (!item || !item.main || !item.weather?.length) return;

    const date = item.dt_txt
      ? new Date(item.dt_txt)
      : new Date(item.dt * 1000);

    const dayKey = date.toISOString().split("T")[0];

    const entry = {
      date,
      weather: item.weather[0].main,
      description: item.weather[0].description,
      temp: item.main.temp,
      temp_min: item.main.temp_min,
      temp_max: item.main.temp_max,
      humidity: item.main.humidity,
      wind: item.wind?.speed ?? 0,
    };

    if (!dayMap[dayKey]) {
      dayMap[dayKey] = entry;
    } else {
      dayMap[dayKey].temp_min = Math.min(
        dayMap[dayKey].temp_min,
        entry.temp_min
      );

      dayMap[dayKey].temp_max = Math.max(
        dayMap[dayKey].temp_max,
        entry.temp_max
      );

      if (entry.temp > dayMap[dayKey].temp) {
        dayMap[dayKey].temp = entry.temp;
        dayMap[dayKey].weather = entry.weather;
        dayMap[dayKey].description = entry.description;
        dayMap[dayKey].humidity = entry.humidity;
        dayMap[dayKey].wind = entry.wind;
      }
    }
  });

  return Object.values(dayMap).slice(0, 5);
};

const Forecast = ({ forecast = [] }) => {
  const dailyForecast = getDailyForecast(forecast);

  if (!dailyForecast.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[35px] border border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-3xl"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">
            Forecast
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            5-Day Forecast
          </h2>
        </div>

        <span className="hidden rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 md:block">
          OpenWeather Forecast
        </span>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide">
        {dailyForecast.map((day, index) => {
          const date = new Date(day.date);

          return (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.04,
              }}
              className="min-w-[230px] rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">
                    {index === 0
                      ? "Today"
                      : date.toLocaleDateString("en-US", {
                          weekday: "long",
                        })}
                  </p>

                  <p className="text-sm text-white/60">
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {getIcon(day.weather)}
              </div>

              <h3 className="mt-5 text-center text-5xl font-bold text-white">
                {Math.round(day.temp)}°
              </h3>

              <p className="mt-2 text-center capitalize text-white/70">
                {day.description}
              </p>

              <div className="mt-6 space-y-3">

                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2">
                  <span>High</span>
                  <span>{Math.round(day.temp_max)}°</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2">
                  <span>Low</span>
                  <span>{Math.round(day.temp_min)}°</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2">
                  <span className="flex items-center gap-2">
                    <WiHumidity size={22} />
                    Humidity
                  </span>

                  <span>{day.humidity}%</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-white/10 px-3 py-2">
                  <span className="flex items-center gap-2">
                    <WiStrongWind size={22} />
                    Wind
                  </span>

                  <span>{day.wind} m/s</span>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Forecast;