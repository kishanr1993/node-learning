const express = require("express");

const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const homeRoutes = require("./routes/homeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// parse JSON
app.use(express.json());


// Home APIs
app.use("", homeRoutes);

// User APIs
app.use("/api/users", userRoutes);

// Role APIs
app.use("/api/roles", roleRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);

module.exports = app;