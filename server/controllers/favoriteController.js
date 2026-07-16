const Favorite = require("../models/Favorite");

// ==============================
// Get Favorites
// ==============================
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: favorites,
    });
  } catch (error) {
    console.error("Get Favorites Error:", error);

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

    // Check duplicate (case-insensitive)
    const existing = await Favorite.findOne({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "City already in favorites.",
        data: existing,
      });
    }

    const favorite = await Favorite.create({
      city,
      country,
    });

    return res.status(201).json({
      success: true,
      message: "Favorite added successfully.",
      data: favorite,
    });

  } catch (error) {
    console.error("Add Favorite Error:", error);

    // Mongo Duplicate Key
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "City already in favorites.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to add favorite.",
    });
  }
};

// ==============================
// Delete Favorite
// ==============================
const deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(req.params.id);

    if (!favorite) {
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
    console.error("Delete Favorite Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete favorite.",
    });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};