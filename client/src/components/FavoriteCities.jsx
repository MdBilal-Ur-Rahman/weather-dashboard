import { motion } from "framer-motion";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaArrowRight,
  FaTrashAlt,
  FaCity,
} from "react-icons/fa";

import { deleteFavorite } from "../services/favoriteApi";

const FavoriteCities = ({
  favorites = [],
  onSelectCity,
  onFavoritesChange,
}) => {
  const handleRemove = async (e, item) => {
    e.stopPropagation();

    try {
      await deleteFavorite(item._id);

      if (onFavoritesChange) {
        await onFavoritesChange();
      }
    } catch (err) {
      console.error(err);
      alert("Unable to delete favorite.");
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

          <div className="rounded-2xl bg-red-500/20 p-4">
            <FaHeart className="text-2xl text-red-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Favorite Cities
            </h2>

            <p className="text-white/60">
              Your saved locations
            </p>
          </div>

        </div>

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/70">
          {favorites.length}
        </span>

      </div>

      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/20 py-10 text-center">
          <FaHeart className="mx-auto mb-4 text-5xl text-white/30" />

          <h3 className="text-xl font-semibold text-white">
            No Favorite Cities
          </h3>

          <p className="mt-2 text-white/60">
            Search a city and tap ❤️ to save it.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((item) => (
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

                <div className="rounded-2xl bg-cyan-500/20 p-3">
                  <FaCity className="text-xl text-cyan-300" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.city}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-white/60">
                    <FaMapMarkerAlt />
                    {item.country}
                  </div>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <button
                  onClick={(e) => handleRemove(e, item)}
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

export default FavoriteCities;