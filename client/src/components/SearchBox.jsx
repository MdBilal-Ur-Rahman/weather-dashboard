import { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const SearchBox = ({ onSearch, onUseLocation }) => {
  const [city, setCity] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim() || loadingSearch) return;

    try {
      setLoadingSearch(true);
      await onSearch(city.trim());
      setCity("");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleLocation = async () => {
    if (loadingLocation) return;

    try {
      setLoadingLocation(true);
      await onUseLocation();
    } finally {
      setLoadingLocation(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-white/15 bg-white/10 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-3xl"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 lg:flex-row"
      >
        <div className="relative flex-1">
          <FiSearch
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70"
          />

          <input
            type="text"
            value={city}
            placeholder="Search city..."
            onChange={(e) => setCity(e.target.value)}
            className="h-14 w-full rounded-2xl border border-white/20 bg-white/15 pl-14 pr-4 text-white placeholder:text-white/60 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
          />
        </div>

        <button
          type="submit"
          disabled={!city.trim() || loadingSearch}
          className="h-14 rounded-2xl bg-cyan-500 px-8 text-base font-semibold text-white shadow-lg transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loadingSearch ? "Searching..." : "Search"}
        </button>

        <button
          type="button"
          onClick={handleLocation}
          disabled={loadingLocation}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-8 text-base font-semibold text-white shadow-lg transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiMapPin size={20} />

          {loadingLocation
            ? "Detecting..."
            : "Use Current Location"}
        </button>
      </form>
    </motion.div>
  );
};

export default SearchBox;