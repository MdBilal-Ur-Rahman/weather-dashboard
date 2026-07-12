import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setDarkMode(!darkMode)}
      className={`relative flex h-14 w-28 items-center rounded-full border transition-all duration-500 backdrop-blur-xl shadow-xl
      ${
        darkMode
          ? "border-slate-700 bg-slate-900/70"
          : "border-white/20 bg-white/20"
      }`}
    >
      {/* Sliding Circle */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className={`absolute flex h-11 w-11 items-center justify-center rounded-full shadow-lg
        ${
          darkMode
            ? "left-[60px] bg-slate-700 text-yellow-300"
            : "left-[4px] bg-white text-orange-500"
        }`}
      >
        {darkMode ? <FiMoon size={22} /> : <FiSun size={22} />}
      </motion.div>

      {/* Labels */}
      <div className="flex w-full justify-between px-4 text-sm font-semibold text-white">
        <span className={`${darkMode ? "opacity-40" : "opacity-100"}`}>
          ☀️
        </span>

        <span className={`${darkMode ? "opacity-100" : "opacity-40"}`}>
          🌙
        </span>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;