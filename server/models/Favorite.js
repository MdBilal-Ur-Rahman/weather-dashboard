const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);