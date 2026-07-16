import { motion } from "framer-motion";
import {
  FaHistory,
  FaSearch,
  FaTrashAlt,
  FaArrowRight,
} from "react-icons/fa";

import {
  clearHistory,
  deleteHistory,
} from "../services/historyApi";

const RecentSearches = ({
  recentSearches = [],
  onSelectCity,
  onRefresh,
}) => {
  const handleClear = async () => {
    try {
      await clearHistory();
      await onRefresh?.();
    } catch (err) {
      console.error(err);
      alert("Failed to clear history.");
    }
  };

  const handleDelete = async (e, item) => {
    e.stopPropagation();

    // ==========================
    // DEBUG LOGS
    // ==========================
    console.log("========== DELETE CLICK ==========");
    console.log("Deleting Item:", item);
    console.log("Delete ID:", item._id);
    console.log("All Recent Searches:", recentSearches);

    try {
      const response = await deleteHistory(item._id);

      console.log("Delete Response:", response);

      await onRefresh?.();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete history.");
    }
  };

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
      className="rounded-[35px] border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-500/20 p-4">
            <FaHistory className="text-2xl text-cyan-300" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Recent Searches
            </h2>

            <p className="text-white/60">
              Search history
            </p>
          </div>
        </div>

        {recentSearches.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 rounded-2xl bg-red-500/20 px-4 py-2 text-red-300 transition hover:bg-red-500/30"
          >
            <FaTrashAlt />
            Clear All
          </button>
        )}
      </div>

      {recentSearches.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/20 py-10 text-center">
          <FaHistory className="mx-auto mb-4 text-5xl text-white/30" />

          <h3 className="text-xl font-semibold text-white">
            No Search History
          </h3>

          <p className="mt-2 text-white/60">
            Your recent searches will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentSearches.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => onSelectCity(item.city)}
              className="group flex cursor-pointer items-center justify-between rounded-3xl border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-2xl bg-sky-500/20 p-3">
                  <FaSearch className="text-xl text-sky-300" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.city}
                  </h3>

                  <p className="text-sm text-white/60">
                    {item.country || "Unknown"}
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : item.searchedAt
                      ? new Date(item.searchedAt).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => handleDelete(e, item)}
                  className="rounded-full p-3 text-red-400 transition hover:bg-red-500/20"
                >
                  <FaTrashAlt />
                </button>

                <FaArrowRight className="text-white/60 transition group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default RecentSearches;