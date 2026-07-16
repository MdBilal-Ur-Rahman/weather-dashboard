const mongoose = require("mongoose");
const Favorite = require("../models/Favorite");

// ==============================
// Get Favorites
// ==============================
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({
      createdAt: -1,
    });

    console.log(
      "📋 Favorite IDs:",
      favorites.map((item) => item._id.toString())
    );

    return res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    console.error("❌ Get Favorites Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch favorites.",
    });
  }
};

// ==============================
// Add Favorite
// ==============================
const addFavorite = async (req, res) => {
  try {
    let { city, country } = req.body;

    if (!city || !city.trim()) {
      return res.status(400).json({
        success: false,
        message: "City is required.",
      });
    }

    city = city.trim();

    // Remove duplicate city first
    await Favorite.deleteMany({
      city: {
        $regex: new RegExp(`^${city}$`, "i"),
      },
    });

    const favorite = await Favorite.create({
      city,
      country,
    });

    console.log("✅ Favorite Added:", favorite);

    return res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (error) {
    console.error("❌ Add Favorite Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Favorite
// ==============================
const deleteFavorite = async (req, res) => {
  try {
    console.log("\n==========================");
    console.log("🗑 FAVORITE DELETE");
    console.log("Incoming ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Favorite ID",
      });
    }

    const allFavorites = await Favorite.find();

    console.log(
      "Database IDs:",
      allFavorites.map((item) => item._id.toString())
    );

    const deleted = await Favorite.findOneAndDelete({
      _id: req.params.id,
    });

    console.log("Deleted:", deleted);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favorite removed successfully.",
    });
  } catch (error) {
    console.error("❌ Delete Favorite Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};