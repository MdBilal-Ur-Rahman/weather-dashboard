import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
} from "react-icons/wi";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-5">
    <div className="h-5 w-24 rounded-full bg-white/20"></div>

    <div className="mt-6 h-10 w-20 rounded-xl bg-white/20"></div>

    <div className="mt-6 h-3 w-full rounded-full bg-white/10"></div>

    <div className="mt-3 h-3 w-5/6 rounded-full bg-white/10"></div>

    <div className="mt-3 h-3 w-2/3 rounded-full bg-white/10"></div>
  </div>
);

const Loader = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-6xl rounded-[40px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,.25)] backdrop-blur-3xl"
      >

        {/* Weather Animation */}

        <div className="relative flex justify-center">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="absolute"
          >
            <WiCloud
              size={170}
              className="text-white/15"
            />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
            }}
          >
            <WiDaySunny
              size={120}
              className="text-yellow-300 drop-shadow-[0_0_45px_rgba(255,210,0,.75)]"
            />
          </motion.div>

        </div>

        {/* Heading */}

        <motion.h2
          animate={{
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
          className="mt-8 text-center text-3xl font-bold text-white"
        >
          Loading Weather...
        </motion.h2>

        <p className="mt-2 text-center text-white/60">
          Fetching live weather, forecast and air quality...
        </p>

        {/* Progress */}

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "250%" }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "linear",
            }}
            className="h-full w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600"
          />

        </div>

        {/* Skeleton Cards */}

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

      </motion.div>

    </div>
  );
};

export default Loader;