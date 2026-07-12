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

    // Remove duplicate city
    await SearchHistory.deleteMany({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    // Save latest search
    const history = await SearchHistory.create({
      city,
      country,
      temperature,
    });

    res.status(201).json({
      success: true,
      data: history,
    });
  } catch (error) {
    console.error("Add History Error:", error.message);

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
    console.error("Get History Error:", error.message);

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
    const history = await SearchHistory.findById(req.params.id);

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "History not found",
      });
    }

    await history.deleteOne();

    res.status(200).json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error("Delete History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete history",
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
    console.error("Clear History Error:", error.message);

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