const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

// Middlewares
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// ==============================
// Global Middlewares
// ==============================
app.use(cors());
app.use(express.json());

// ==============================
// Routes
// ==============================
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.get("/favicon.ico", (req, res) => res.sendStatus(204));

// ==============================
// Home Route
// ==============================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Weather Backend Running Successfully 🚀"
    });
});

// ==============================
// 404 Middleware
// ==============================
app.use(notFound);

// ==============================
// Global Error Handler
// ==============================
app.use(errorHandler);

// ==============================
// Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running On Port ${PORT}`);
});