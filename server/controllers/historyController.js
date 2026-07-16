const SearchHistory = require("../models/SearchHistory");

// ======================================
// Add Search History
// ======================================
const addHistory = async (req, res) => {
  try {
    const { city, country, temperature } = req.body;

    if (!city || !country || temperature === undefined) {
      return res.status(400).json({
        success: false,
        message: "City, country and temperature are required",
      });
    }

    // Update existing city or create new one
    const history = await SearchHistory.findOneAndUpdate(
      {
        city: { $regex: new RegExp(`^${city}$`, "i") },
      },
      {
        city,
        country,
        temperature,
        searchedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Add History Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Search History
// ======================================
const getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find().sort({
      searchedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error("Get History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch search history",
    });
  }
};

// ======================================
// Delete Single History
// ======================================
const deleteHistory = async (req, res) => {
  try {
    const deleted = await SearchHistory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error("Delete History Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Clear History
// ======================================
const clearHistory = async (req, res) => {
  try {
    const result = await SearchHistory.deleteMany({});

    res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
      message: "All search history cleared successfully",
    });
  } catch (error) {
    console.error("Clear History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear search history",
    });
  }
};

module.exports = {
  addHistory,
  getHistory,
  deleteHistory,
  clearHistory,
};