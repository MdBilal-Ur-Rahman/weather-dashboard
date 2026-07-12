const Favorite = require("../models/Favorite");

// ==============================
// Get Favorites
// ==============================
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Add Favorite
// ==============================
const addFavorite = async (req, res) => {
  try {
    const { city, country } = req.body;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    const exists = await Favorite.findOne({ city });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "City already exists",
      });
    }

    const favorite = await Favorite.create({
      city,
      country,
    });

    res.status(201).json({
      success: true,
      data: favorite,
    });
  } catch (error) {
    res.status(500).json({
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
    await Favorite.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Favorite deleted",
    });
  } catch (error) {
    res.status(500).json({
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