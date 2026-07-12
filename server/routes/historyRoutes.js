const express = require("express");

const router = express.Router();

const {
    addHistory,
    getHistory,
    deleteHistory,
    clearHistory,
} = require("../controllers/historyController");

// Add Search History
router.post("/", addHistory);

// Get All History
router.get("/", getHistory);

// Delete One
router.delete("/:id", deleteHistory);

// Clear All
router.delete("/", clearHistory);

module.exports = router;