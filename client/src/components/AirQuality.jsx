import { motion } from "framer-motion";
import {
  FaWind,
  FaSmog,
  FaLeaf,
  FaCloud,
} from "react-icons/fa";

const getStatus = (aqi) => {
  switch (aqi) {
    case 1:
      return {
        text: "Excellent",
        color: "text-green-400",
        bg: "bg-green-500/20",
        border: "border-green-400",
      };

    case 2:
      return {
        text: "Good",
        color: "text-green-300",
        bg: "bg-green-500/20",
        border: "border-green-300",
      };

    case 3:
      return {
        text: "Moderate",
        color: "text-yellow-300",
        bg: "bg-yellow-500/20",
        border: "border-yellow-300",
      };

    case 4:
      return {
        text: "Poor",
        color: "text-orange-300",
        bg: "bg-orange-500/20",
        border: "border-orange-300",
      };

    case 5:
      return {
        text: "Very Poor",
        color: "text-red-400",
        bg: "bg-red-500/20",
        border: "border-red-400",
      };

    default:
      return {
        text: "No Data",
        color: "text-white",
        bg: "bg-white/10",
        border: "border-white/20",
      };
  }
};

const QualityCard = ({ icon, title, value }) => (
  <motion.div
    whileHover={{
      y: -8,
      scale: 1.03,
    }}
    transition={{
      duration: 0.25,
    }}
    className="flex min-h-[190px] flex-col justify-between rounded-[30px] border border-white/15 bg-white/10 p-7 shadow-xl backdrop-blur-3xl"
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-4xl text-cyan-300">
      {icon}
    </div>

    <div className="mt-6">
      <p className="text-lg text-white/70">
        {title}
      </p>

      <h3 className="mt-3 text-4xl font-bold text-white break-all">
        {value}
      </h3>
    </div>
  </motion.div>
);

const AirQuality = ({ airQuality }) => {
  if (!airQuality) return null;

  const data = {
    aqi: airQuality.aqi ?? 0,
    pm2_5: airQuality.pm2_5 ?? "--",
    pm10: airQuality.pm10 ?? "--",
    co: airQuality.co ?? "--",
    no2: airQuality.no2 ?? "--",
    o3: airQuality.o3 ?? "--",
  };

  const status = getStatus(data.aqi);

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="w-full rounded-[40px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-3xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-6">

        <div className="flex items-center gap-5">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-500/20">
            <FaWind className="text-5xl text-cyan-300" />
          </div>

          <div>

            <h2 className="text-4xl font-bold text-white">
              Air Quality
            </h2>

            <p className="mt-1 text-lg text-white/60">
              Live Air Pollution Index
            </p>

          </div>

        </div>

        <div
          className={`rounded-full px-7 py-3 ${status.bg}`}
        >
          <span
            className={`text-lg font-bold ${status.color}`}
          >
            {status.text}
          </span>
        </div>

      </div>

      <div className="my-12 flex justify-center">

        <motion.div
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className={`flex h-52 w-52 items-center justify-center rounded-full border-[12px] ${status.border} bg-white/10 shadow-xl`}
        >
          <div className="text-center">

            <h1 className="text-7xl font-extrabold text-white">
              {data.aqi}
            </h1>

            <p className="mt-3 text-lg text-white/70">
              AQI
            </p>

          </div>

        </motion.div>

      </div>

      <div
        className="
          grid
          gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
        "
      >

        <QualityCard
          icon={<FaSmog />}
          title="PM2.5"
          value={data.pm2_5}
        />

        <QualityCard
          icon={<FaCloud />}
          title="PM10"
          value={data.pm10}
        />

        <QualityCard
          icon={<FaLeaf />}
          title="CO"
          value={data.co}
        />

        <QualityCard
          icon={<FaLeaf />}
          title="NO₂"
          value={data.no2}
        />

        <QualityCard
          icon={<FaLeaf />}
          title="O₃"
          value={data.o3}
        />

      </div>

      <div className="mt-10 rounded-[30px] border border-white/15 bg-white/10 p-6 text-center text-lg text-white/70">
        Air Quality information is powered by the OpenWeather Air Pollution API.
      </div>

    </motion.section>
  );
};

export default AirQuality;