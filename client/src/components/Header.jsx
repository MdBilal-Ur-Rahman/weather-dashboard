import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="rounded-[35px] border border-white/20 bg-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-3xl w-full overflow-hidden"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">

        {/* Left */}

        <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-center">

          <div className="flex h-18 w-18 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/30 to-blue-500/30 shadow-lg">
            <WiDaySunny
              size={48}
              className="text-yellow-300"
            />
          </div>

          <div className="min-w-0">

            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80 truncate">
              Weather Studio
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl truncate">
              Weather Dashboard
            </h1>

            <p className="mt-2 text-white/60 truncate">
              Live Forecast • Air Quality • Maps • Favorites
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-end gap-4 min-w-0 text-right">

          <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 min-w-0 truncate">
            {today}
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 min-w-0">
            <FaGithub />
            <span className="truncate">React • Node • MongoDB • OpenWeather</span>
          </div>

        </div>

      </div>
    </motion.header>
  );
};

export default Header;