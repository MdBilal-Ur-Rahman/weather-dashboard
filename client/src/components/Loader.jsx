import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloud,
} from "react-icons/wi";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl border border-white/10 bg-white/10 p-5">
    <div className="h-5 w-24 rounded bg-white/20"></div>

    <div className="mt-5 h-10 w-20 rounded bg-white/20"></div>

    <div className="mt-4 h-3 w-full rounded bg-white/10"></div>

    <div className="mt-2 h-3 w-2/3 rounded bg-white/10"></div>
  </div>
);

const Loader = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">

      <div className="w-full max-w-5xl rounded-[40px] border border-white/15 bg-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-3xl">

        {/* Weather Animation */}

        <div className="relative flex justify-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 18,
              ease: "linear",
            }}
            className="absolute"
          >
            <WiCloud
              size={170}
              className="text-white/20"
            />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
          >
            <WiDaySunny
              size={120}
              className="text-yellow-300 drop-shadow-[0_0_45px_rgba(255,220,0,0.7)]"
            />
          </motion.div>

        </div>

        {/* Text */}

        <motion.h2
          animate={{
            opacity: [0.5, 1, 0.5],
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
          Fetching latest weather information...
        </p>

        {/* Progress */}

        <div className="mt-8 overflow-hidden rounded-full bg-white/10">

          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "100%",
            }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "linear",
            }}
            className="h-2 w-32 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600"
          />

        </div>

        {/* Skeleton */}

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />

        </div>

      </div>

    </div>
  );
};

export default Loader;