import { motion } from "framer-motion";
import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiThermometer,
} from "react-icons/wi";

import {
  FaEye,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaCompass,
} from "react-icons/fa";

const Card = ({ icon, title, value }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group flex min-h-[250px] flex-col justify-between rounded-[36px] border border-white/15 bg-white/10 p-8 shadow-[0_25px_60px_rgba(0,0,0,.18)] backdrop-blur-3xl transition-all hover:bg-white/15"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/20 text-5xl text-cyan-300 transition-all group-hover:scale-110">
        {icon}
      </div>

      <div className="mt-8">
        <p className="text-lg font-medium text-white/70">
          {title}
        </p>

        <h3 className="mt-4 break-words text-5xl font-bold text-white">
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

const WeatherDetails = ({ weather }) => {
  if (!weather) return null;

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
      className="w-full rounded-[40px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,.18)] backdrop-blur-3xl"
    >
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white">
          Today's Highlights
        </h2>

        <p className="mt-2 text-lg text-white/60">
          Weather conditions at a glance
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          xl:grid-cols-4
          2xl:grid-cols-4
        "
      >
        <Card
          icon={<WiHumidity />}
          title="Humidity"
          value={`${weather.humidity ?? "--"}%`}
        />

        <Card
          icon={<WiStrongWind />}
          title="Wind Speed"
          value={
            weather.windSpeed !== undefined
              ? `${weather.windSpeed} m/s`
              : "--"
          }
        />

        <Card
          icon={<WiBarometer />}
          title="Pressure"
          value={
            weather.pressure !== undefined
              ? `${weather.pressure} hPa`
              : "--"
          }
        />

        <Card
          icon={<FaEye />}
          title="Visibility"
          value={
            weather.visibility !== undefined
              ? `${weather.visibility} km`
              : "--"
          }
        />

        <Card
          icon={<WiThermometer />}
          title="Feels Like"
          value={
            weather.feelsLike !== undefined
              ? `${Math.round(weather.feelsLike)}°`
              : "--"
          }
        />

        <Card
          icon={<FaTemperatureHigh />}
          title="Max Temp"
          value={
            weather.tempMax !== undefined
              ? `${Math.round(weather.tempMax)}°`
              : "--"
          }
        />

        <Card
          icon={<FaTemperatureLow />}
          title="Min Temp"
          value={
            weather.tempMin !== undefined
              ? `${Math.round(weather.tempMin)}°`
              : "--"
          }
        />

        <Card
          icon={<FaCompass />}
          title="Condition"
          value={weather.weather || "--"}
        />
      </div>
    </motion.section>
  );
};

export default WeatherDetails;